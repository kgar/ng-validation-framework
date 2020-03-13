# To Do 📃

- Surface option for using label and icon; default => true
- Create and surface option for using validation message; default => true
- Extract error label into its own component
- Extract error icon into its own component
- Extract error message into its own component
- Demonstrate custom error message placement
  - Recreate Default Suffix scenario with long input box and short label. Show custom message "Invalid input" with error icon and tooltip with actual message.
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

## Composing/providing validation

Composing metadata for existing validation services is in one place, but it is still a bit messy and accidental.

Composing metadata for new custom services is not yet implemented, but I can see it being much messier still.

I need a solution where individual validators can register with a central store or map. They would provide the validation function and the full validation summary object.

This needs to scale in a distributed way where adding new stuff is simple.
