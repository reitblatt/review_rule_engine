# Generated by Django 4.1.2 on 2022-10-30 17:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_condition_effect_trigger_post_state_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewRule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.condition')),
                ('effect', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.effect')),
                ('trigger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.trigger')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
