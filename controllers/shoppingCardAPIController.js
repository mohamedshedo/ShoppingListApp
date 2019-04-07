const shoppingCard= require('./../db/shoppingList');
const _ = require('lodash');

module.exports=(app)=>{
    app.get('/shoppingCard',(req,res)=>{
        shoppingCard.getShoppingCard((err,result)=>{
            res.send(result);
        });
    });

    app.post('/shoppingCardItem',(req,res)=>{
        let reqBody=_.pick(req.body,['requiredQuantity','productId']);

        shoppingCard.addShoppingProduct(reqBody.productId,reqBody.requiredQuantity,(err,result)=>{
            if(err){
                res.status(err.code).send(err.msg);
            }else{
                res.send(result);
            }
        });
    });

    app.delete('/shoppingCardItem/:id',(req,res)=>{
        let productId=req.params.id;

        shoppingCard.removeShoppingProduct(productId,(err,result)=>{
            if(!err){
                res.send(result)
            }else{
                res.status(err.code).send(err.msg);
            }
        })
    });

    app.delete('/shoppingCard',(req,res)=>{
        shoppingCard.clearShoppingCard((err,result)=>{
            if(!err){
                res.send(result);
            }else{
                res.status(500).send(err);
            }
        })
    })
};