const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.status(200).json({message: 'Get handeled for orders'});
});

router.post('/', (req, res, next)=> {
    const order = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    res.status(200).json({message: 'Post handeled for orders', createdOrder: order});
});

router.patch('/:id', (req, res, next)=> {
    const id = req.params.id;
    res.status(200).json({message: 'Patch handeled for orders', id: id});
});

router.delete('/:id', (req, res, next)=> {
    const id = req.params.id;
    res.status(200).json({message: 'Delete handeled for orders', id: id});
});

module.exports = router;