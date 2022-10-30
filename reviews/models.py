from django.db import models

"""
    To demonstrate the rule engine, we build a simple review system over a basic 'post' object.
"""

class Post(models.Model):
    pass

class PostReviewJob(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Reviewer(models.Model):
    name = models.CharField(max_length=100)
    
class PostReview(models.Model):
    class Decision(models.TextChoices):
        IGNORE = 'ignore'
        DELETE = 'delete'
        
    reviewer = models.ForeignKey(Reviewer, on_delete=models.CASCADE)
    job = models.ForeignKey(PostReviewJob, on_delete=models.CASCADE)
    decision = models.CharField(
        max_length=50,
        choices=Decision.choices,
    )
