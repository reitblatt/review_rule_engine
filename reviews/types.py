import strawberry
from strawberry import auto
from typing import List
from . import models


@strawberry.django.type(models.Post)
class Post:
    id: auto
    state: auto


@strawberry.django.type(models.PostReviewJob)
class PostReviewJob:
    id: auto
    status: auto
    post: Post


@strawberry.django.type(models.Trigger)
class ReviewTrigger:
    id: auto
    trigger_name: auto


@strawberry.django.type(models.Condition)
class ReviewCondition:
    id: auto
    property: auto
    value: auto


@strawberry.django.type(models.Effect)
class ReviewEffect:
    id: auto
    name: auto


@strawberry.django.type(models.ReviewRule)
class ReviewRule:
    id: auto
    trigger: ReviewTrigger
    condition: ReviewCondition
    effect: ReviewEffect
    success_count: auto
    failure_count: auto
