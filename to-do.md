# To Do 📃
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

## Nested form groups
I've read various Medium articles on how to share components that have validation rules built in.
Some of the options available:
- 

## Composing validation
The right way and the simplest way are sometimes one and the same. I took the simplest approach by making an AppValidators static class with static props that represent the canned validators, their default error messages, their priority, and their ValidatorFn for reactive forms.
