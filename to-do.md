# To Do 📃
- Solve nested forms in the simplest way that is still maintainable / scalable / reusable 😬
- (Ongoing) Solve sandbox scenarios
- Add Kendo UI with the Bootstrap theme
- Add open sans regular, semibold, and bold
- Set up open sans as the main font
- Apply some basic styles globally and then use in the validation control component for structuring the content
- Add support for validation decoration on basic Kendo controls
  - This could be already done by Kendo, else a directive may suffice to style Kendo controls as errored.
- Add hook for customizing error messages
- 
- ...


# Notes 📝
I've got some to-do's that came to mind while working, but I'd like to take a step back and think about the problem. Here are those to-do's:
- Graduate the validation message map to a singleton service that can be built up using multi->true injection or some similarly distributed solution.
- Add custom validator in the same folder where the preexisting validators are having messages applied to the map.
- Extract the core validation wrappings (Control, Group, Array?) into components
- Create component(s) for abstracting away the input title, the error icon decoration, and the error message
