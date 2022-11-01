# Intro

This is an exploration of what a basic rule engine might look like in Django. It's a very simple design, and much of the complexity is pushed to the client.

I haven't wrapped it as a library yet, and include a demo app based on a simple human review application.

In a future iteration, we might add:
- instrumentation for simpler trigger, condition, effect creation
- a basic condition language
- a rule UI

# Installation instructions

Run `git clone https://github.com/reitblatt/review_rule_engine`

`cd review_rule_engine` and run:

```
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

Run the initial data migration:

```
python manage.py migrate
```

To confirm everything works, run the tests:
```
python manage.py test
```

Start the server with:
```
python manage.py runserver
```

# Playing with it

Currently there is no UI, so you'll have to view the rules via the admin UI. You can set up an adminuser with:
```
python manage.py createsuperuser
```

And then navigate to http://localhost:8000/admin (make sure the server is running!) and enter the credentials you just created.

To get some basic rules and objects, load up the provided fixtures:

```
python manage.py loaddata reviews/fixtures/*.json
```

# Design

The basic skeleton of the Rule Engine lives in the rule_engine app, which provides abstract base models:
```
RuleTarget
Trigger
Condition
Effect
Rule
```

The bones of the rule execution engine is in `rule_engine.rule_engine.RuleEngine`.

To use it, you need to provide instantiations for each of the base models (`Rule` can be trivial).

## Trigger
Triggers define the the events that should cause your rule to run. Examples of triggers might be:

- Creation of a specific Django object
- Updates to an object
- An HttpRequest (think about the QPS first!)

We require that triggers be represented by Django signals (you can use the same signal for multiple triggers).

Triggers need to implement the `get_signal()` and `register()` methods.