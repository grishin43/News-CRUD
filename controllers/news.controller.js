const News = require('../models/news.model');

exports.create_news = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'News title cannot be empty'
        });
    }
    if (!req.body.description) {
        return res.status(400).send({
            message: 'News description cannot be empty'
        });
    }
    const news = new News(
        {
            title: req.body.title,
            image: req.body.image || 'none',
            date: req.body.date,
            description: req.body.description,
            author: req.body.author || 'N/A'
        }
    );

    news.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Someone goes wrong'
        });
    });
};

exports.getAll_news = (req, res) => {
    News.find()
        .then(news => {
            res.send(news);
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Someone goes wrong'
        });
    });
};


exports.get_news = (req, res) => {
    News.findById(req.params.id)
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: `News with id: ${req.params.id} is not found`
                });
            }
            res.send(news);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `News with id: ${req.params.id} is not found`
            });
        }
        return res.status(500).send({
            message: `Something goes wrong while getting news with id ${req.params.id}`
        });
    });
};

exports.update_news = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'News title cannot be empty'
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: 'News description cannot be empty'
        });
    }

    News.findByIdAndUpdate(req.params.id, {$set: req.body})
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: `News with id: ${req.params.id} is not found`
                });
            }
            res.send(news);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `News with id: ${req.params.id} is not found`
            })
        }
        return res.status(500).send({
            message: `Error occurred while updating news with id: ${req.params.id}`
        })
    });
};

exports.delete_news = (req, res) => {
    News.findByIdAndRemove(req.params.id)
        .then(news => {
            if (!news) {
                return res.status(404).send({
                    message: `News with id: ${req.params.id} is not found`
                });
            }
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `News with id: ${req.params.id} is not found`
            });
        }
        return res.status(500).send({
            message: `Could not delete news with id ${req.params.id}`
        })
    });
};