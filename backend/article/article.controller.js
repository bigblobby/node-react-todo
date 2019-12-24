const Article = require('./article.model');
const Op = require('sequelize').Op;

async function getAll(req, res){
    let options = {};

    if(req.query.page){
        var limit = 5;
        var offset = (req.query.page - 1) * limit;

        options = {offset: offset, limit: limit};
    }



    Article.findAndCountAll(options)
        .then(result => {
            const totalPages = Math.ceil(result.count / limit);

            if(req.query.page > totalPages){
                return res.status(404).json({message: 'Page not found'});
            }

            res.status(200).json({
                total: result.count,
                totalOnPage: result.rows.length,
                limit: limit,
                page: Number(req.query.page),
                totalPages: totalPages,
                items: result.rows
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: err});
        });
}

function getOne(req, res){
    Article.findByPk(req.params.id)
        .then(item => {
            if(item) {
                console.log(item);
                res.status(200).json(item);
            } else {
                console.log('No article found');
                res.status(404).json({message: 'No article found'})
            }
        }).catch(err => {
        console.error(err);
        res.status(500).json({message: err})
    });
}

function createOne(req, res){
    Article.sync().then(() => {
        Article.create({
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content
        }).then(item => {
            res.status(201).json({
                item: item,
                message: 'Article created successfully'
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({message: err})
        });
    });
}

function deleteOne(req, res){
    Article.destroy({where: {id: req.params.id}})
        .then((article) => {
            if(article){
                console.log('The article with id:' + req.params.id + ' has been deleted');
                res.status(200).json({message: 'Item deleted'});
            } else {
                console.log('No article found');
                res.status(400).json({message: 'No article found'})
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

    Article.update(updates, {
        where: { id: req.params.id },
        returning: true
    }).then(article => {
        if(article[1]){
            return Article.findByPk(req.params.id);
        } else {
            return null;
        }
    }).then(article => {
        if(article){
            res.status(200).json({
                message: 'Successfully updated',
                article: article
            });
        } else {
            res.status(400).json({message: 'No article found'});
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
