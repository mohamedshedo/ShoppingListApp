const products= require('./../db/products');
const _ = require('lodash');
module.exports=(app)=>{
    app.get('/products',(req,res)=>{
        products.allProducts((err,products)=>{
            res.send(products);
        })
    });
    app.post('/product',(req,res)=>{
        let reqBody= _.pick(req.body,['productId','productName','price','quantityAvailable']);

        products.addProduct(reqBody,(err,result)=>{
            if(err){
                res.status(err.code).send(err.msg);
            }else{
                res.send(result);
            }
        });
    });

    app.patch('/product/:id',(req,res)=>{
        let reqBody= _.pick(req.body,[,'productName','price','quantityAvailable']);
        let productId=req.params.id;
        products.updateProduct(productId,reqBody,(err,result)=>{
            if(err){
                res.status(err.code).send(err.msg);
            }else{
                res.send(result);
            }
        });
    });

    app.delete('/product/:id',(req,res)=>{
        let productId=req.params.id;

        products.deleteProduct(productId,(err,result)=>{
            if(err){
                res.status(err.code).send(err.msg);
            }else{
                res.send(result);
            }
        });
    })
}