from django.db.models.signals import post_save
from . import models

    
"""
    Todo: make this a singleton class
"""
class RuleEngine:
    __known_triggers = None
    __rule_class = None
    __trigger_class = None
    
    def __init__(self, RuleClass: type[models.Rule], TriggerClass: type[models.Trigger]):
        """
            Note: we have to do the group by list in python because django doesn't provide a list aggregation. 
            If we were using Postgres, we could do it in the query with an ArrayAgg...
        """
        self.__rule_class = RuleClass
        self.__trigger_class = TriggerClass
        print(self.__trigger_class)
        self.__known_triggers = {value['trigger'] for value in RuleClass.objects.values('trigger').distinct()}
        triggers = [TriggerClass.objects.get(pk=trigger_pk) for trigger_pk in self.__known_triggers]
        print(triggers)        
        for trigger in triggers:            
            self.__register_trigger(trigger)
        post_save.connect(self.register_new_rule, sender=models.Rule, weak=False)
        
    def __handle_trigger(self, trigger: models.Trigger, sender, instance, **kwargs):
        print(sender)
        print(instance)
        for rule in self.__rule_class.objects.filter(trigger=trigger):
            print(f"about to run {rule}")
            rule.run_rule(instance)
            print(f"just ran rule {rule}")
    
    def __register_trigger(self, trigger: models.Trigger):
        print(f"registering trigger {trigger}")
        # todo: get the sender from the trigger itself
        trigger.get_signal().connect(
            lambda sender, instance, **kwargs: self.__handle_trigger(trigger, sender, instance, **kwargs),
            weak=False
        )
        
    def register_new_rule(self, rule: models.Rule, **kwargs):                
        if rule.trigger not in self.__known_triggers:
            self.__register_trigger(rule.trigger)            
        self.__known_triggers += rule.trigger

    

