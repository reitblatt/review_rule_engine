from django.dispatch import receiver
from . import models
from . import signals


@receiver(signals.run_rule_engine)
def handle_run_rule_engine(sender, target: models.RuleTarget, trigger: models.Trigger, **kwargs):
    rules = models.RuleTarget.objects.filter(trigger=trigger)
    print(rules.values())
    print(f"received run_rule_engine signal: {sender}")    
    for rule in rules:
        rule.run_rule(target)
    

