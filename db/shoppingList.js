const products=require('./products');
let shoppingCard={
    totalPrices:0,
    totalItems:[]
};

let addShoppingProduct=(productId,requiredQuantity,cb)=>{
    if(!productId && typeof(productId)!= 'number'){
        cb({code:400,msg:'product id not valid'});
        return;
    }else if(!requiredQuantity&& typeof(requiredQuantity)!='number'){
        cb({code:400,msg:'quantity number not valid'});
        return;
    }
    products.getProduct(productId,(err,result)=>{
        if(err){
            cb(err)
        }else{
            if(result.quantityAvailable>0 && result.quantityAvailable-requiredQuantity>=0){
                products.updateProduct(
                    productId,
                    {quantityAvailable:result.quantityAvailable-requiredQuantity},
                    (err,result)=>{
                        if(!err){
                            productIsAlreadyExists=false;
                            for(item of shoppingCard.totalItems){
                                if(item.productId== productId){
                                    item.requiredQuantity+=requiredQuantity;
                                    productIsAlreadyExists=true;
                                    break;
                                }
                            }

                            if(!productIsAlreadyExists){
                                shoppingCard.totalItems.push({
                                    productId,
                                    requiredQuantity,
                                    price:result.price
                                });
                            }
                       
                        shoppingCard.totalPrices+=(result.price*requiredQuantity);
                        cb(null,shoppingCard);
                        }else{
                            cb(err)
                        }
                });
            }else{
                cb({code:400,msg:"no quantity available"})
            }
        }
    })
};


let removeShoppingProduct=(productId,cb)=>{
    if(!productId && typeof(productId)!= 'number'){
        cb({code:400,msg:'product id not valid'});
        return;
    }
    deletedProduct=null;
    shoppingCard.totalItems=shoppingCard.totalItems.filter((product)=>{
        if(product.productId==productId){
            deletedProduct=product;
            shoppingCard.totalPrices-=(product.price*product.requiredQuantity);
            return false;
        }else{
            return true;
        }
    });
    if(deletedProduct){
    products.getProduct(productId,(err,result)=>{
        if(err){
            cb({code:400,msg:'no product exist'});
        }else{
            products.updateProduct(productId,{quantityAvailable:result.quantityAvailable+deletedProduct.requiredQuantity},(err,result)=>{
                if(err){
                    cb({code:400,msg:'no product exist'})
                }else{
                    cb(null,shoppingCard);
                }
            })
        }
    });
    }else{
        cb({code:400,msg:'no product exist'})
    }
};

let getShoppingCard=(cb)=>{
    let updatedProducts=[];
    for(originalProduct of shoppingCard.totalItems){
        products.getProduct(originalProduct.productId,(err,product)=>{
            if(!err){
                originalProduct.price=product.price;
                updatedProducts.push(originalProduct);
            }
        });
    }
    shoppingCard.totalPrices=0;
    for(item of updatedProducts){
        shoppingCard.totalPrices+=(item.price*item.requiredQuantity);
    }
    shoppingCard.totalItems=updatedProducts;
    cb(null,shoppingCard);
}

let clearShoppingCard=(cb)=>{
    for(item of shoppingCard.totalItems){
        products.getProduct(item.productId,(err,result)=>{
            if(!err){
                products.updateProduct(item.productId,{quantityAvailable:item.requiredQuantity+result.quantityAvailable},(err,result)=>{
                    
                })
            }
        });
    }

    shoppingCard.totalItems=[];
    shoppingCard.totalPrices=0;
    cb(null,shoppingCard);
}

module.exports={
    addShoppingProduct,
    removeShoppingProduct,
    getShoppingCard,
    clearShoppingCard
}