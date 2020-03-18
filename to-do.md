# To Do 📃
- Try this: Make async validation occur only at form submission time
  - Create service that creates observable to await pending validation until it's either valid or invalid
  - Upgrade the KingOfTheHillValidator to be async
  - Put the KingOfTheHillValidator in an ActivatedValidator and use as AsyncValidator in formgroup
  - Update submit() to activate validators, update validity of the form, create observable of awaiting validation, and return success or failure of form submission
- Add open sans regular, semibold, and bold
- Set up open sans as the main font
- Apply some basic styles globally and then use in the validation control component for structuring the content
- Add support for validation decoration on basic Kendo controls
  - This could be already done by Kendo, else a directive may suffice to style Kendo controls as errored.
- Add hook for customizing error messages
- Remove magenta box shadows; too much trouble to persist across all inputs
- ...

# Notes 📝

## Validation Grouping
Because form group validation doesn't come stocked with the ability to decorate child controls when the form itself is invalid, I had to come up with the concept of a manual validator.
I can roll out as many of these manual validators as I want, provided they each use a unique key.
The downside is that it's a bit of a RTFM situation; I'll need to document how to do this on our wikis.
I would've made helpers to layer on these additional validation scenarios, but Angular has specifically made it impossible to add new validators dynamically, so only one helper could ever work at a time, unless I do something weird like return a new array of the current validators for each of the controls that are validated as a group, and that borders on being even less maintainable than just hardcoding the whole thing.
Until I get some time to collaborate with fellow devs on how to clean it up, it'll just be hardcoded and clunky.
Not the end of the world, I guess.

## Custom trigger for async validation
I get that Angular provides ways to adjust when to update validation, but even then, async validation updating on keyup or blur is still so wasteful. 
Also, being unable to specify updateOn for a specific validator is unfortunate.
So, I want to perform async validation on an attempted form submit. To make this work, I'm going to have to do something like manual validation, like ActivatedAsyncValidation. I need to be able to just trigger async validation during a form submission.
There are 2 parts to this challenge:
1. Waiting for status to be something other than "pending" (one way to do it: https://stackoverflow.com/a/52191003/1902445)
2. Triggering async validation for the duration of the submission process
  - I'm thinking of implementing an ActivatedValidator of T, where T is an async validator
  - The ActivatedValidator part will feed Success observable results until told to enforce the async validator
  - The code would activate the validator and then request an update to status / validity
  - After this, use the technique in part 1 to wait for something other than "pending". Once no longer pending, deactivate the activated validator but don't update validity. The user will do it and dismiss the message.

## Nested form groups
I've read various Medium articles on how to share components that have validation rules built in.
Some of the options available: 
- Pass the relevant form group down and let the child work with that
- Have the child declare their own form group and have the parent dynamically tack it on
- Use control value accessors
- ...
I ended up going with @Input() formGroup: FormGroup. I made it so the shared component doesn't care whether the form group is nested or not. The main form group could directly reference properties and pass itself, or the parent form could send down a nested formgroup dedicated only to the shared component. This simplified things quite a bit.

## Composing validation
The right way and the simplest way are sometimes one and the same. I took the simplest approach by making an AppValidators static class with static props that represent the canned validators, their default error messages, their priority, and their ValidatorFn for reactive forms.

## Making a library
I considered making an angular library and packaging it up with a local NPM feed at work, but for the medium term, I'm going to just plug it in. It relies on FontAwesome and style guide theming. None of this has been packaged out yet for the lib and the consumer to share, so it would result in hardcoded colors, etc. There, it's punted.
