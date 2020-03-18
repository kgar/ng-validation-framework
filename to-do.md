# To Do 📃
- Figure out how to make group validation cleaner, if possible
- Make a shared component with its own formgroup
  - Add a form model
  - Add a form service and compose validation
  - Ensure it initializes with empty data to begin with
  - Expose an input for the form group
- Plug in the component to the sandbox in multiple places, nested under different circumstances
  - In one place, add a validation rule
  - In another place, reset the validation rules altogether
- Solve nested forms in the simplest way that is still maintainable / scalable / reusable 😬
- Validator registration: need order, message, and ValidatorFn registered with the validator store
  - Determine where to put validation summaries for custom validators
  - Determine where to put validation summaries for built-in validators
- Add a custom validator where name cannot be "Sideshow Bob" and configure with new configuration strategy
  - Is this scalable?
- (Ongoing) Solve sandbox scenarios
- Add Kendo UI with the Bootstrap theme
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

## Nested form groups
I've read various Medium articles on how to share components that have validation rules built in.
Some of the options available: 
- Pass the relevant form group down and let the child work with that
- Have the child declare their own form group and have the parent dynamically tack it on
- Use control value accessors
- ...

## Composing validation
The right way and the simplest way are sometimes one and the same. I took the simplest approach by making an AppValidators static class with static props that represent the canned validators, their default error messages, their priority, and their ValidatorFn for reactive forms.

## Making a library
I considered making an angular library and packaging it up with a local NPM feed at work, but for the medium term, I'm going to just plug it in. It relies on FontAwesome and style guide theming. None of this has been packaged out yet for the lib and the consumer to share, so it would result in hardcoded colors, etc. There, it's punted.
