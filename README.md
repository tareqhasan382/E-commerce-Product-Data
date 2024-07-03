# E-Commerce Express Application with TypeScript and MongoDB

## Objective

This project aims to develop an E-Commerce application using Express with TypeScript, integrating MongoDB with Mongoose for effective data management. Data integrity is ensured through validation using Zod.

## Features

1. **Product Management**

   - Create a new product
   - Retrieve a list of all products
   - Retrieve a specific product by ID
   - Update product information
   - Delete a product
   - Search for a product by name

2. **Order Management**

   - Create a new order
   - Retrieve all orders
   - Retrieve orders by user email

3. **Inventory Management**
   - Update inventory on order creation
   - Handle insufficient stock errors

### API Endpoints

##### Product Management

### Create a New Product

- Endpoint: `/api/products`
- Method: `POST`

```bash
{
  "name": "iPhone 13",
  "description": "A sleek and powerful smartphone with cutting-edge features.",
  "price": 999,
  "category": "Electronics",
  "tags": ["smartphone", "Apple", "iOS"],
  "variants": [
    {
      "type": "Color",
      "value": "Midnight Blue"
    },
    {
      "type": "Storage Capacity",
      "value": "256GB"
    }
  ],
  "inventory": {
    "quantity": 50,
    "inStock": true
  }
}

```

### Retrieve a List of All Products

- Endpoint: `/api/products`
- Method: `GET`

### Update Product Information

- Endpoint: `/api/products/:productId`
- Method: `PUT`

```bash
{
  "name": "iPhone 13",
  "description": "A sleek and powerful smartphone with cutting-edge features.",
  "price": 999,
  "category": "Electronics",
  "tags": ["smartphone", "Apple", "iOS"],
  "variants": [
    {
      "type": "Color",
      "value": "Midnight Blue"
    },
    {
      "type": "Storage Capacity",
      "value": "256GB"
    }
  ],
  "inventory": {
    "quantity": 50,
    "inStock": true
  }
}


```

### Delete a Product

- Endpoint: `/api/products/:productId`
- Method: `DELETE`

### Search for a Product

- Endpoint: `/api/products?searchTerm=iphone`
- Method: `GET`

## Order Management

#### Create a New Order

- Endpoint: `/api/orders`
- Method: `POST`

```bash
{
  "email": "user@gmail.com",
  "productId": "5fd67e890b60c903cd8544a3",
  "price": 999,
  "quantity": 1
}

```

### Retrieve All Orders

- Endpoint: `/api/orders`
- Method: `GET`

### Retrieve Orders by User Email

- Endpoint: `/api/orders?email=user@gmail.com`
- Method: `GET`

### Error Handling

- Insufficient Quantity Error:

```bash
{
  "success": false,
  "message": "Insufficient quantity available in inventory"
}
```

- Not Found Error:

```bash
{
  "success": false,
  "message": "Order not found"
}
```

- Not Found Route:

```bash
{
  "success": false,
  "message": "Route not found"
}
```

### Validation

- Data validation is implemented using Zod to ensure data integrity.

- #### Note

<> This Project not yet completed , will be soon completed. </>

        Happay Coding...
