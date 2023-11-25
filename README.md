# NYC taxis demo
This is a coding exercise for a FE position
### Description

We need you to develop a small application to show the data behind the [API endpoint](https://api.tinybird.co/endpoint/t_f3b68895534049bf859f38a8e5ebc51a?token=p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c),  displaying it with a nice widget component.

In short, we will need:
- A widget for displaying any data. It can be a chart, a list, a counter,... whatever you decide. We encourage you to check the data first and decide what you want to visualize wisely.
- A filter for changing the information displayed in the widget. It can be a select, a list of checkboxes, a range... It depends on the story you want to tell through the data.

**Note:** you don't need to add tons of widgets, with just one is enough for us.

### Rules
- You CAN use the JS framework you prefer.
- The app needs to have deep linking. Let the users of the app share the widgets with the filters applied.
- You CAN use a JavaScript bundler. 
- Add tests, you CAN use any testing framework. No need to test everything, but at least show us how you approach testing.
- Take as much time as you need (although we suggest you not spend more than 4-5 hours in total)
- Add a README.md file with the decisions you took, any detail you want to share with us (possible follow-ups, for example), and the installation instructions. We expect the app to work as expected following your instructions. The explanation is as important as the code, so take some time to write things down.

# Development mode
install dependencies with
```bash
yarn
```
and run project with
```bash
yarn start
```

## Testing
Run the command
```bash
yarn test
```

### Principles followed
- Don't reinvent the wheel. Material-UI library already has a powerful Grid component that provides components to filter elements, to sort columns, to edit fields. At the end it took a bit of time to find the exact way of implementing it, but no need to create stuff from scratch.
- Use AI with caution. I used Github Copilot to generate code and tests, but at the end, I had to tweak and check that all was looking good and it met my standards.
- Test only what is worth to be tested. I tested the [utils](./src/utils/) folder because it has pure functions that need to be reliable, but it makes little sense to do a render test over the small created components, moreover if they are already provided by a battle tested library like Material-UI. Place tests in the same folder as the tested ones, we don't want to have to maintain separated trees of files.
- Separation of concerns. Components, utils, services, configuration, in their respective folders. Keep each domain separate, easy to be found. 

### Decisions taken
- import an existing repository from other exercises, which contains a working grid demo.
- use the `q` parameter to make the requests to the api. Also, use the `LIMIT` and `OFFSET` from SQL to get pages, because requesting without them, the amount of data is too large and it just blows. As we don't need all the data at once, I decided this paginated view instead.
- use [Mui Data Grid](https://mui.com/components/data-grid/) to display the data, as it has great built-in features which are useful for this exercise.
- Mui Data Grid (the free version) is limited to 100 results per page, so I took that as the page size.
- use [React Query](https://react-query.tanstack.com/) to have cached client side requests which are easy to integrate.
- translations were not implemented for the sake of simplicity
- accessibility has not been taken into account for the sake of simplicity
- As the amount of data is huge and the Mui Data Grid basic does not have nice pagination controls, it was created a `page` input on top so the user can jump to any desired page.
- created a toaster to warn user when the end of data has been reached and when there is errors with the API.

