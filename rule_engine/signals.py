import django.dispatch
from django.db.models.signals import post_save
from django.dispatch import receiver

from . import models

run_rule_engine = django.dispatch.Signal(providing_args=["target", "trigger"])