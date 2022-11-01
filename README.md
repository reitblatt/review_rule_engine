# Intro

This is an exploration of what a basic rule engine might look like in Django. It's a very simple design, and much of the complexity is pushed to the client.

I haven't wrapped it as a library yet, and include a demo app based on a simple human review application.

Potential elaborations could be:
- instrumentation for simpler trigger, condition, effect creation
- a basic condition language
- a rule UI
- standard Pythonic wrappers (e.g. make Effect and Condition callables)

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

Again, this is very barebones. Rule Engines in general can be sources of extreme complexity (they quick evolve into Turing Complete systems with basic arithmetic), so be careful!

## Trigger
Triggers define the the events that should cause your rule to run. Examples of triggers might be:

- Creation of a specific Django object
- Updates to an object
- An HttpRequest (think about the QPS first!)

You can use whatever framework you want for triggers, but the simplest is just to wrap Django signals. Triggers need to implement the `register()` method, which should trigger the passed in callback function whenever the trigger fires.

## Condition
Conditions define whether a rule is satisfied. For example, if your Rule was targeting an Animal object, you might have a condition for `has_a_tail`. Even though conditions are evaluated over single objects, you can make stateful rules that depend upon the database, e.g. have a condition `is_first_of_its_kind`.

Conditions are usually a source of high complexity in a rule engine, so think carefully about your design. The only requirement your rule model has is that it must implement the `is_satisfied` method.

## Effect
Effects are what happens after your rule runs (and the condition is satisfied). Example effects might be:

- Changing the state of the RuleTarget
- Updating a counter (watch out for loops if updating a counter is a Trigger!)

## Rule
This ties together a trigger, a condition, and an effect. It can be a trivial instantiation of `Rule`.

## RuleEngine

To put it all together and actually run the rules, you will need to instantiate the RuleEngine class somewhere in your application, passing in the Rule, e.g.:

```rule_engine.RuleEngine(RuleClass=models.ReviewRule)```

And now it will be running in the background!