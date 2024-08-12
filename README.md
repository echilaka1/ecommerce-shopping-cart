# Send Sprint Frontend Engineer Test

Link to hosted test [Send Sprint Frontend Test](https://sendsprint-ecommerce.netlify.app/)

## Front-end Engineer Skill Assessment

Create a responsive web application that allows users to browse and search for products in an e-commerce catalog, view product details, and manage a shopping cart using [Fake Store API] (https://fakestoreapi.com/)

## Commands

After you download this project, these commands are available in `package.json`.

Make sure [NodeJS](https://www.nodejs.org/) or [Yarn](https://www.yarnpkg.com) is installed on your machine.

```bash
'yarn install' or 'npm install' to install dependencies # run the app in development mode
```

## Playing locally

After installing dependencies,

```bash
$ yarn start or npm start
```

You app will open at http://localhost:3000

> Note that the server may start on a different port if :3000 is in use.

## Directory structure

### Overview

```tree
├─ public/
│  ├─ index.html
├─ src/
│  ├─ __test__/
|  |  ├─apiUtils.test.js
|  |  ├─CartContext.test.js
|  |  ├─CartIcon.test.js
|  |  ├─Categories.test.js
|  |  ├─EcommerceProductCatalog.test.js
|  |  ├─ProductDetails.test.js
|  |  ├─Products.test.js
|  |  ├─ShoppingCart.test.js
│  ├─ assets/
|  |  ├─css
|  |  |  ├─ contains css
|  ├─ components/
|  |  ├─CartIcon
|  |  ├─Categories
|  |  ├─ProductDetails
|  |  ├─Products
|  |  ├─ShoppingCart
|  ├─ context/
|  |  ├─CartContext
│  ├─ pages/
|  |  ├─ entry
|  |  |  ├─ contains the entry index file
│  ├─ utils/
|  |  ├─ apiUtils.js
│  ├─ index.js
│  ├─ App.js
├─ package.json
└─ README.md
```

## Libraries used

> lucide-react - for icons

> es-lint - for finding and fixing problems with javascript code

> jest and react-testing-library - for unit test

## Requirements covered

Covered all requirements asides from the bonus features
