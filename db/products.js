const products= require('./products.json');


let addProduct=(newProduct,cb)=>{
    if(!newProduct|| !newProduct.productId || !newProduct.productName || !newProduct.quantityAvailable || !newProduct.price){
         cb({code:400,msg:"Missing Data"})
         return;
    }
    else{
        if(typeof (newProduct.productId)!=='number' || isNaN(newProduct.productId)){
            cb({code:400,msg:'product Id in not valid'});
            return;
        }else if(newProduct.productName.trim().length==0){
            cb({code:400,msg:'product Name is not valid'});
            return;
        }else if(typeof (newProduct.price)!=='number' || isNaN(newProduct.price)){
            cb({code:400,msg:'product price is not valid'});
            return;
        }else if(typeof (newProduct.quantityAvailable)!=='number' || isNaN(newProduct.quantityAvailable)){
            cb({code:400,msg:'product quantity is not valid'})
            return;
        }

        for(product of products){
            if(product.productId===newProduct.productId){
                cb({code:400,msg:"product Id in already exists"});
                return;
            }
        }
        products.push(newProduct);
        cb(null,newProduct);
    }
}

let updateProduct=(productId,changes,cb)=>{
    if(!productId){
        cb({code:400,msg:'invalid productId'});
        return;
    }else if(changes.productName &&changes.productName.trim().length==0){
        cb({code:400,msg:'product Name is not valid'});
        return;
    }else if( changes.price && (typeof (changes.price)!=='number' || isNaN(changes.price)|| changes.price<0)){
        cb({code:400,msg:'product price is not valid'});
        return;
    }else if(changes.quantityAvailable&&(typeof (changes.quantityAvailable)!=='number' || isNaN(changes.quantityAvailable|| changes.quantityAvailable<0))){
        cb({code:400,msg:'product quantity is not valid'})
        return;
    }

    let changesKeys=Object.keys(changes);
    if(changesKeys.length>0){
    for(product of products){
        if(product.productId==productId){
            for( change of changesKeys){
                if(change!='productId'){
                    product[change]=changes[change];
                }
            }
            cb(null,product);
            return;
        }
    }
    cb({code:404,msg:'theres no product with given id'});
    }else{
    cb({code:400,msg:'theres no changes provided'})
    }
}

let deleteProduct=(productId,cb)=>{
    if(!productId){
        cb({code:400,msg:'invalid productId'});
        return;
    }
    let deletedProduct=null;
    products= products.filter((product)=>{
        if(product.productId==productId){
            deletedProduct=product;
            return false;
        }else{
            return true;
        }
    });

    if(deletedProduct){
        cb(null,deletedProduct);
    }else{
        cb({code:404,msg:'no product with given id'});
    }
}

let getProduct=(productId,cb)=>{
        if(!productId){
            cb({code:400,msg:'invalid productId'});
            return;
        }
        let targetProduct=null;
       products.forEach((product)=>{
            if(product.productId==productId){
                targetProduct=product;
            }
        });
        if(targetProduct){
            cb(null,targetProduct);
        }else{
            cb({code:404,msg:'no product with given id'});
        }
    }


let allProducts=(cb)=>{
    cb(null,products)
}

module.exports={
    addProduct,
    updateProduct,
    deleteProduct,
    allProducts,
    getProduct
}