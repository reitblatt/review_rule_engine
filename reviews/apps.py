from django.apps import AppConfig


class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'            

    def ready(self):
        from . import models        
        from . import review_rule_engine
        