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
    signals.review_completed.send(sender=sender, instance=instance)
    print("Send review_completed signal")
    
    
"""
    Todo: make this a singleton class
"""
class ReviewRuleEngine:
    __known_triggers = None
    
    def __init__(self):
        """
            Note: we have to do the group by list in python because django doesn't provide a list aggregation. 
            If we were using Postgres, we could do it in the query with an ArrayAgg...
        """
        self.__known_triggers = {value['trigger'] for value in models.ReviewRule.objects.values('trigger').distinct()}
        triggers = [models.Trigger.objects.get(pk=trigger_pk) for trigger_pk in self.__known_triggers]
        print(triggers)        
        for trigger in triggers:            
            self.__register_trigger(trigger)
        post_save.connect(self.register_new_rule, sender=models.ReviewRule, weak=False)
        
    def __handle_trigger(self, trigger: models.Trigger, sender, instance, **kwargs):
        print(sender)
        print(instance)
        for rule in models.ReviewRule.objects.filter(trigger=trigger):
            print(f"about to run {rule}")
            rule.run_rule(instance)
            print(f"just ran rule {rule}")
    
    def __register_trigger(self, trigger: models.Trigger):
        print(f"registering trigger {trigger}")
        # todo: get the sender from the trigger itself
        trigger.get_signal().connect(
            lambda sender, instance, **kwargs: self.__handle_trigger(trigger, sender, instance, **kwargs), 
            sender=models.PostReview, 
        weak=False)
        
    def register_new_rule(self, rule: models.ReviewRule, **kwargs):                
        if rule.trigger not in self.__known_triggers:
            self.__register_trigger(rule.trigger)            
        self.__known_triggers += rule.trigger

    