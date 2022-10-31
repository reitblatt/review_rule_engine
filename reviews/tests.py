from django.test import TestCase
from unittest import mock
from .models import *


class ComponentsBaseTestCase(TestCase):
    fixtures = ['posts', 'postreviewjobs', 'reviewers']

    def setUp(self):
        self.post = Post.objects.first()
        self.job = PostReviewJob.objects.create(post=self.post)
        self.reviewer = Reviewer.objects.first()

    class Meta:
        abstract = True


class ConditionTestCase(ComponentsBaseTestCase):

    def test_is_first_review(self):
        condition = Condition.objects.create(
            property=Condition.Choices.IS_NTH_REVIEW, value=1)
        review = PostReview.objects.create(
            job=self.job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.IGNORE
        )
        self.assertTrue(condition.is_satisfied(review))

    # This is actually buggy, because it will pass for both review1 and review2
    def test_is_second_review(self):
        condition = Condition.objects.create(
            property=Condition.Choices.IS_NTH_REVIEW, value=2)
        review1 = PostReview.objects.create(
            job=self.job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.IGNORE
        )
        review2 = PostReview.objects.create(
            job=self.job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.IGNORE
        )
        self.assertTrue(condition.is_satisfied(review2))

    def test_decision_matches(self):
        condition = Condition.objects.create(
            property=Condition.Choices.DECISION_IS,
            value=PostReview.Decision.IGNORE
        )
        review = PostReview.objects.create(
            job=self.job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.IGNORE
        )
        self.assertTrue(condition.is_satisfied(review))

    def test_decision_not_matches(self):
        condition = Condition.objects.create(
            property=Condition.Choices.DECISION_IS,
            value=PostReview.Decision.IGNORE
        )
        review = PostReview.objects.create(
            job=self.job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.DELETE
        )
        self.assertFalse(condition.is_satisfied(review))


class EffectTestCase(ComponentsBaseTestCase):

    def setUp(self):
        super().setUp()
        self.inprogress_job = PostReviewJob.objects.create(
            post=self.post,
            status=PostReviewJob.State.IN_PROGRESS
        )
        self.review = PostReview.objects.create(
            job=self.inprogress_job,
            reviewer=self.reviewer,
            decision=PostReview.Decision.IGNORE
        )

    def test_close_job(self):
        self.assertEqual(self.inprogress_job.status,
                         PostReviewJob.State.IN_PROGRESS)
        effect = Effect.objects.create(name=Effect.Choices.CLOSE)
        effect.perform_effect(self.review)
        self.assertEqual(self.inprogress_job.status,
                         PostReviewJob.State.CLOSED)

    def test_delete_and_close_job(self):
        self.assertEqual(self.inprogress_job.post.state, Post.State.PUBLISHED)
        effect = Effect.objects.create(name=Effect.Choices.DELETE_AND_CLOSE)
        effect.perform_effect(self.review)
        self.assertEqual(self.inprogress_job.status,
                         PostReviewJob.State.CLOSED)
        self.assertEqual(self.inprogress_job.post.state,
                         Post.State.DELETED)


class RuleTestCase(TestCase):
    fixtures = ['posts', 'postreviewjobs', 'reviewers', 'postreviews',
                'triggers', 'conditions', 'effects', 'rules']

    def setUp(self):
        self.post = Post.objects.first()
        self.job = PostReviewJob.objects.create(post=self.post)
        self.reviewer = Reviewer.objects.first()

    def test_is_first_review(self):
        first_review_rule = ReviewRule.objects.all().filter(
            condition__property='is_nth_review').filter(condition__value=1).first()
        first_review_rule.effect.perform_effect = mock.Mock(
            side_effect=Exception('ran the effect!'))
        review = PostReview.objects.create(
            job=self.job, decision=PostReview.Decision.IGNORE, reviewer=self.reviewer)
        self.assertRaises(
            Exception, lambda: first_review_rule.run_rule(review))

    def test_is_not_first_review(self):
        first_review_rule = ReviewRule.objects.all().filter(
            condition__property='is_nth_review').filter(condition__value=1).first()
        first_review_rule.effect.perform_effect = mock.Mock(
            side_effect=Exception('ran the effect!'))
        review1 = PostReview.objects.create(
            job=self.job, decision=PostReview.Decision.IGNORE, reviewer=self.reviewer)
        review2 = PostReview.objects.create(
            job=self.job, decision=PostReview.Decision.IGNORE, reviewer=self.reviewer)
        first_review_rule.run_rule(review2)

    def test_is_second_review(self):
        review_rule = ReviewRule.objects.all().filter(
            condition__property='is_nth_review').filter(condition__value=2).first()
        review_rule.effect.perform_effect = mock.Mock(
            side_effect=Exception('ran the effect!'))
        review1 = PostReview.objects.create(
            job=self.job, decision=PostReview.Decision.IGNORE, reviewer=self.reviewer)
        review2 = PostReview.objects.create(
            job=self.job, decision=PostReview.Decision.IGNORE, reviewer=self.reviewer)
        self.assertRaises(
            Exception, lambda: review_rule.run_rule(review2))
