# workspace
This is a coding exercise for a FE position
## Specifications
- Use TypeScript
- Use React
- Have tests
- Components should be reusable
- Use [Material-UI](https://mui.com) or Styled Components
- Use [React-query](https://react-query.tanstack.com/) for the queries
- Use [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mocked data
- Show data in a table
    - Bonus if editing is implemented
- Support filtering data by "title"
- All posts with ids as [prime numbers](https://en.wikipedia.org/wiki/List_of_prime_numbers) should have the title in the table shown in italic

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
