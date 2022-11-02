import strawberry
from typing import List

from reviews import review_rule_engine
from .types import ReviewRule


@strawberry.type
class Query:
    rules: List[ReviewRule] = strawberry.django.field()


schema = strawberry.Schema(query=Query)
