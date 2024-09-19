# Task 1: Product catalog and cart

- Changed the method for displaying records in `store.js` so that the current list is displayed as a list of products.
- Removed the functionality for counting records, adding and selecting records.
- Added logic for the add product to cart button. Each click on the button adds the product to the cart, increasing its quantity.
- The total number of unique products and their total cost are displayed in the site header.

# Task 2: Adding a product to the cart

- Implemented the `addToCart` method in `store.js`, which adds a product to the cart and increases its quantity each time the button is clicked.
- To correctly calculate the cost of products, added logic for calculating the total amount of all products in the cart, taking into account the quantity of each product.
- The site header displays the total number of unique products and the total cost.

# Task 3: Displaying the cart in a modal window

- Added a modal form for displaying products in the cart. The modal window opens when you click the button in the header.
- The modal displays a list of products with the quantity of each product and the total amount.
- Each product in the cart has a delete button that completely removes the product from the cart.
- The total amount of all products is displayed at the bottom of the modal window.
- A button to close the modal window has been added.

# Additional task: Replacing defaultProps

- Now the default values ​​for properties are set via the parameters of component functions.
