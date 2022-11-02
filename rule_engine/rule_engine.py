from django.db.models.signals import post_save
from . import models


"""
    Todo: make this a singleton class
"""


class RuleEngine:
    __known_triggers = None
    __rule_class = None

    def __init__(self, RuleClass: type[models.Rule]):
        """
            Note: we have to do the group by list in python because django doesn't provide a list aggregation. 
            If we were using Postgres, we could do it in the query with an ArrayAgg...
        """
        self.__rule_class = RuleClass
        TriggerClass = RuleClass._meta.get_field('trigger').remote_field.model
        self.__known_triggers = {
            value['trigger'] for value in RuleClass.objects.values('trigger').distinct()}
        triggers = [TriggerClass.objects.get(
            pk=trigger_pk) for trigger_pk in self.__known_triggers]
        for trigger in triggers:
            self.__register_trigger(trigger)
        post_save.connect(self.register_new_rule,
                          sender=models.Rule, weak=False)

    def __handle_trigger(self, trigger: models.Trigger, target):
        for rule in self.__rule_class.objects.filter(trigger=trigger):
            rule.run_rule(target)

    def __register_trigger(self, trigger: models.Trigger):
        # todo: get the sender from the trigger itself
        trigger.register(lambda target:
                         self.__handle_trigger(trigger, target))

    def register_new_rule(self, rule: models.Rule, **kwargs):
        if rule.trigger not in self.__known_triggers:
            self.__register_trigger(rule.trigger)
        self.__known_triggers += rule.trigger
