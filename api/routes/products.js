const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    request: ' GET',
                    url: 'https://my-node-server-one.herokuapp.com/products ' + doc._id
                }
            })
        }
        res.status(200).json(response);
    })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(success => {
            console.log(success)
            res.status(201).json({
                message: 'Post handeled for products',
                createdProduct: product
            });
        })
        .catch(err => console.error(err));
});

router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => { res.status(500).json(err) });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id }).exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(200).json(err) })
});
module.exports = router;