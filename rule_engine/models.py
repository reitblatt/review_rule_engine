from django.db import models

class RuleTarget(models.Model):
    class Meta:
        abstract = True
        
class Trigger(models.Model):
    class Meta:
        abstract = True
        
    def register(self):
        raise NotImplementedError(f"Subclasses of {__class__} must implement {self.__func__.__name__}")
                
class Condition(models.Model):
    class Meta:
        abstract = True
    
    def is_satisfied(self, target: RuleTarget):
        raise NotImplementedError(f"Subclasses of {__class__} must implement {self.__func__.__name__}")
    
class Effect(models.Model):
    class Meta:
        abstract = True
        
    def perform_effect(self, target: RuleTarget):
        raise NotImplementedError(f"Subclasses of {__class__} must implement {self.__func__.__name__}")
        
class Rule(models.Model):
    trigger = models.ForeignKey(Trigger, on_delete=models.CASCADE)
    condition = models.ForeignKey(Condition, on_delete=models.CASCADE)
    effect = models.ForeignKey(Effect, on_delete=models.CASCADE)
    
    class Meta:
        abstract = True
        
    def run_rule(self, target: RuleTarget):
        if(self.condition.is_satisfied(target)):
            self.effect.perform_effect(target)
            
    def register(self):
        self.trigger.register()