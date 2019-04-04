const products= require('./products.json');


let addProduct=(newProduct,cb)=>{
    if(!newProduct&& !newProduct.productId && !newProduct.productName && !newProduct.quantityAvailable && !newProduct.price){
         cb("Missing Data")
         return;
    }
    else{
        if(typeof (newProduct.productId)!=='number' || isNaN(newProduct.productId)){
            cb('product Id in not valid');
            return;
        }else if(newProduct.productName.trim().length==0){
            cb('product Name is not valid');
            return;
        }else if(typeof (newProduct.price)!=='number' || isNaN(newProduct.price)){
            cb('product price is not valid');
            return;
        }else if(typeof (newProduct.quantityAvailable)!=='number' || isNaN(newProduct.quantityAvailable)){
            cb('product quantity is not valid')
            return;
        }

        for(product of products){
            if(product.productId===newProduct.productId){
                cb("product Id in already exists");
                return;
            }
        }
        products.push(newProduct);
        cb(null,newProduct);
    }
}

let updateProduct=(productId,changes,cb)=>{
    if(!productId){
        cb('invalid productId');
        return;
    }
    let changesKeys=Object.keys(changes);
    if(changes.length>0){
    for(product of products){
        if(product.productId===productId){
            for( change of changesKeys){
                product[change]=changes[change]
            }
            cb(null,product);
            return;
        }
    }
    cb('theres no product with given id');
    }else{
    cb('theres no changes provided')
    }
}

let deleteProduct=(productId,cb)=>{
    if(!productId){
        cb('invalid productId');
        return;
    }
    let deletedProduct=null;
    products.filter((product)=>{
        if(product.productId==productId){
            deletedProduct=product;
            return true;
        }else{
            return false;
        }
    });

    if(deletedProduct){
        cb(null,deletedProduct);
    }else{
        cb('no product with given id');
    }
}

let allProducts=(cb)=>{
    cb(null,products)
}

module.exports={
    addProduct,
    updateProduct,
    deleteProduct,
    allProducts
}