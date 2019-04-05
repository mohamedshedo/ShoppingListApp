# ShoppingListApp

## Run Project
```
npm start
```

## Products related endpoints

add product
  Request's body must be like this: 
  
  {
        "productId": 1, 
        "productName": "name ", 
        "price": 1, 
        "quantityAvailable":2 
   }
   
```
POST /product
```
______________________________________________________________________________
edit product

  adding the product id in the params and the modifications in body request like this:
 
  {
        "productName": "new name ", 
        "price": 1, 
        "quantityAvailable":2 
   }
```
PATCH /product/:id

```
______________________________________________________________________________
remove product
  adding product id in the params.
```
DELETE /product/:id
```
______________________________________________________________________________

get all available products
```
GET /products
```

## Shopping Card related endpoints
add product to the list
  adding the product details in request's body like this:
   {
        "productId": 1,
        "requiredQuantity":2
    }
```
POST /shoppingCardItem

```
______________________________________________________________________________
remove product from the list
  adding the the product id to requests params
```
DELETE /shoppingCardItem/:id
```
______________________________________________________________________________
get the shopping card details
```
GET /shoppingCard
```
______________________________________________________________________________
