# Inventory Manager

This application is designed to help you manage your product inventory efficiently.

## Common View

Dashboard Widgets: The top section of the app displays four widgets showcasing essential information.
Product Table: All products are listed in a table.
Toggle for changing between admin/user roles.

## Admin View

Edit Product: Clicking on the edit icon opens a popup allowing you to edit the product details.
Delete Product: Clicking on the delete icon removes the entire product from the table.
Disable Product Modification: Clicking on the eye icon disables the ability to modify the product regardless of the user role.

## User View

For users, all action buttons are disabled to prevent any modifications to the inventory.

## Technologies Used

- React.js
- TypeScript: For type-safety.
- React Redux with Redux Toolkit: For State management.
- Axios: For making API requests.
- Tailwind CSS: Styling.
- Vercel: For deployment.

## My approach

I wanted this application to be as close to production as possible. So I setup a proper project structure.

Code Modularity being one of my strengths, I stuck to it. The modal for editing product details, dashboard card, navbar, each row in the table, all are built as components to ensure they can be reused elsewhere in future.

Probably the biggest assumptions I made was that it's okay to not properly follow the design provided with the assignment. Considering the timeframe, I wanted to prioritise more on the functionality, modularity and extensibility more and hence the code readability took a hit but thanks to TailwindCSS, I had very few things to worry about when it came to the design.

Using Redux was actually fun because it's been quite a while since I've used it. At first I wrote the delete/disable functions in the React component file, later realised I could do that right inside once of the store slices and refactored it within minutes, followed by extending the state's capability by adding a helper function called `getInventoryStats`

Above all, I enjoyed building this project.