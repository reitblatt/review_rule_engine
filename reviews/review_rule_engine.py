from django.db.models.signals import post_save
from django.dispatch import receiver
from rule_engine import rule_engine
from . import signals
from . import models

"""
    Note: just using the 'post_save' signal here for simplicity. This is actually not fully correct, 
    as this signal doesn't trigger for every review creation event (e.g. bulk creates). This is a cornercase
    that would have to be handled correctly in a real application.
"""


@receiver(post_save, sender=models.PostReview)
def _send_review_completed(sender, instance, **kwargs):
    signals.review_completed.send(sender=sender, instance=instance)


rule_engine.RuleEngine(RuleClass=models.ReviewRule)
