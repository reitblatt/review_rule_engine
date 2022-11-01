from django.db import models
from rule_engine import models as rule_models
from . import signals

"""
    To demonstrate the rule engine, we build a simple review system over a basic 'post' object.
"""


class Post(models.Model):
    class State(models.TextChoices):
        PUBLISHED = 'published'
        DELETED = 'deleted'

    state = models.CharField(
        max_length=50,
        choices=State.choices
    )

    def __str__(self):
        return f"{self.pk} ({self.state})"


class PostReviewJob(models.Model):
    class State(models.TextChoices):
        UNREVIEWED = 'unreviewed'
        IN_PROGRESS = 'in_progress'
        CLOSED = 'closed'

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=50,
        choices=State.choices
    )

    def __str__(self):
        return f"{self.post} - {self.status}"


class Reviewer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class PostReview(models.Model):
    class Decision(models.TextChoices):
        IGNORE = 'ignore'
        DELETE = 'delete'

    reviewer = models.ForeignKey(
        Reviewer,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    job = models.ForeignKey(
        PostReviewJob,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    decision = models.CharField(
        max_length=50,
        choices=Decision.choices,
    )

    def __str__(self):
        return f"job {self.job.pk} - {self.reviewer} - {self.decision}"


"""
    Set up rule engine to run over the review objects
"""

RuleTarget = PostReview


class Trigger(rule_models.Trigger):
    class Choice(models.TextChoices):
        ON_REVIEW_CREATE = 'on_review_create'

    trigger_name = models.CharField(
        max_length=200,
        choices=Choice.choices
    )
    sender = models.CharField(max_length=200)

    def register(self, callback):
        signal = self._get_signal()
        signal.connect(lambda instance, **
                       kwargs: callback(target=instance), weak=False)

    def _get_signal(self):
        match self.trigger_name:
            case __class__.Choice.ON_REVIEW_CREATE:
                print("matched CREATE trigger")
                return signals.review_completed
            case default:
                print(f"unknown trigger {self.trigger_name}")

    def __str__(self):
        return f"{self.trigger_name} ON {self.sender}"


class Condition(rule_models.Condition):
    class Choices(models.TextChoices):
        IS_NTH_REVIEW = 'is_nth_review'
        DECISION_IS = 'decision_is'
        ALL_DECISIONS_MATCH = 'all_decisions_match'

    property = models.CharField(
        max_length=100,
        choices=Choices.choices,
    )

    # Very simple model, not forcing the value to match with the property...
    value = models.CharField(
        max_length=100,
        null=True,
    )

    def is_satisfied(self, target: PostReview):
        match self.property:
            case __class__.Choices.IS_NTH_REVIEW:
                n = int(self.value)
                return n == target.job.reviews.count()
            case __class__.Choices.DECISION_IS:
                decision = PostReview.Decision(self.value)
                return target.decision == decision
            case __class__.Choices.ALL_DECISIONS_MATCH:
                return 1 >= target.job.reviews.values('decision').distinct().count()

    def __str__(self):
        return f"{self.property}: {self.value}"


class Effect(rule_models.Effect):
    class Choices(models.TextChoices):
        CLOSE = "close_job"
        DELETE_AND_CLOSE = 'delete_and_close'
        NOTHING = 'nothing'

    name = models.CharField(
        max_length=50,
        choices=Choices.choices
    )

    def perform_effect(self, target: PostReview):
        match self.name:
            case __class__.Choices.CLOSE:
                target.job.status = PostReviewJob.State.CLOSED
                target.job.save()
            case __class__.Choices.DELETE_AND_CLOSE:
                # Obviously all of this logic should be implemented elsewhere, but going for simplicity
                target.job.status = PostReviewJob.State.CLOSED
                target.job.post.state = Post.State.DELETED
                target.job.save()
                target.job.post.save()
            case __class__.Choices.NOTHING:
                pass

    def __str__(self):
        return self.name


class ReviewRule(rule_models.Rule):
    def __str__(self):
        return f"WHENEVER [{self.trigger}] IF [{self.condition}] DO [{self.effect}]"
