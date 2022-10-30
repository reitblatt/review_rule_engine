from django.db.models.signals import post_save
from django.dispatch import receiver
from . import signals
from . import models

"""
    Note: just using the 'post_save' signal here for simplicity. This is actually not fully correct, 
    as this signal doesn't trigger for every review creation event (e.g. bulk creates). This is a cornercase
    that would have to be handled correctly in a real application.
"""
@receiver(post_save, sender=models.PostReview)
def _send_review_completed(sender, instance, **kwargs):
    signals.review_completed.send(sender=sender, review=instance)
    print("Send review_completed signal")
    
    
"""
    Todo: make this a singleton class
"""
class ReviewRuleEngine:
    __signals = None
    
    def __init__(self):
        trigger_pks = list(models.ReviewRule.objects.values('trigger').distinct())
        triggers = [models.Trigger.objects.get(pk=trigger_pk['trigger']) for trigger_pk in trigger_pks]
        print(triggers)
        self.__signals = [trigger.get_signal() for trigger in triggers]
        for signal in self.__signals:
            signal.connect(self.__handle_trigger)
            
        post_save.connect(self.register_new_rule)
        
    def __handle_trigger(self, sender, **kwargs):
        print(sender)
        raise NotImplementedError("Haven't implemented trigger handling in the rule engine yet!")
        
    def register_new_rule(self, rule: models.ReviewRule, **kwargs):
        new_signal = rule.trigger.get_signal()
        if new_signal not in self.__signals:
            self.__signals += new_signal
            new_signal.connect(self.__handle_trigger)                    

    