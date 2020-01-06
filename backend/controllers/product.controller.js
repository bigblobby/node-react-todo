const Product = require('../models/product.model');

function getAll(req, res){
    const set = req.query.set;
    const limit = Number(req.query.limit);
    const offset = (set - 1) * limit;
    let options = {offset: offset, limit: limit};

    Product.findAndCountAll(options)
        .then(result => {
            res.status(200).json({total: result.count, result: result.rows});
        }).catch((err) => {
            res.status(500).json({message: err})
        });
}

function createOne(req, res){
    Product.sync().then(() => {
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }).then(product => {
            res.status(201).json({
                item: product,
                message: 'Product created successfully'
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({message: err})
        });
    });
}

module.exports = {
    getAll: getAll,
    createOne: createOne
};
