const Todo = require('../models/todo.model');
const helper = require('../helpers/todo.helpers');
const Op = require('sequelize').Op;

async function getAll(req, res){
    let options = {};

    if(req.query.page){
        var limit = Number(req.query.limit) || 10;
        var offset = (req.query.page - 1) * limit;

        const order = helper.getOrder(req.query.order);

        options = {offset: offset, limit: limit, order: order};
    }

    Todo.findAndCountAll(options)
        .then(result => {
            const totalPages = Math.ceil(result.count / limit);

            if(req.query.page > totalPages){
                return res.status(404).json({message: 'Page not found'});
            }

            if(req.query.page) {
                // TODO: totalOnPage is not used on the frontend, may want to remove
                res.status(200).json({
                    total: result.count,
                    totalOnPage: result.rows.length,
                    limit: limit,
                    page: Number(req.query.page),
                    totalPages: totalPages,
                    items: result.rows
                });
            } else {
                res.status(200).json({
                    total: result.rows.length,
                    items: result.rows
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: err});
        });
}

function getOne(req, res){
    Todo.findByPk(req.params.id)
        .then(item => {
            if(item) {
                res.status(200).json(item);
            } else {
                console.log('No todo found');
                res.status(404).json({message: 'No todo found'})
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: err})
        });
}

function createOne(req, res){
    Todo.sync().then(() => {
        Todo.create({
            title: req.body.title,
            priority: req.body.priority,
            completed: req.body.completed
        }).then(item => {
            res.status(201).json({
                item: item,
                message: 'Todo created successfully'
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({message: err})
        });
    });
}

function deleteOne(req, res){
    Todo.destroy({where: {id: req.params.id}})
        .then((item) => {
            if(item){
                console.log('The todo with id:' + req.params.id + ' has been deleted');
                res.status(200).json({message: 'Item deleted'});
            } else {
                console.log('No todo found');
                res.status(400).json({message: 'No todo found'})
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).json({message: err});
        });
}

function updateOne(req, res){
    const updates = {};

    for(const ops of req.body){
        updates[ops.property] = ops.value;
    }

    Todo.update(updates, {
        where: { id: req.params.id },
        returning: true
    }).then(todo => {
        if(todo[1]){
            return Todo.findByPk(req.params.id);
        } else {
            return null;
        }
    }).then(todo => {
        if(todo){
            res.status(200).json({
                message: 'Successfully updated',
                todo: todo
            });
        } else {
            res.status(400).json({message: 'No todo found'});
        }
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: err});
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    createOne: createOne,
    deleteOne: deleteOne,
    updateOne: updateOne
};
