# ShoppingListApp

## Run Project
```
npm start
```

## Products related endpoints

add product
  Request's body must be like this: 
  
  {
        "productId": 1, //number
        "productName": "name ", //string
        "price": 1, //number
        "quantityAvailable":2 //number
   }
   
```
POST /product
```
edit product

  adding the product id in the params and the modifications in body request like this:
 
  {
        "productName": "new name ", //string
        "price": 1, //number
        "quantityAvailable":2 //number
   }
```
PATCH /product/:id

```
remove product
  adding product id in the params.
```
DELETE /product/:id
```

get all available products
```
GET /products
```

## Shopping Card related endpoints
add product to the list
```
POST /shoppingCardItem

```
remove product from the list
```
DELETE /shoppingCardItem/:id
```
get the shopping card details
```
GET /shoppingCard
```
