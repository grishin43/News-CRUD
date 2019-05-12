const express = require('express');
const router = express.Router();
const news_controller = require('../controllers/news.controller');

module.exports = router;

router.post('/create',news_controller.create_news);
router.get('/get/:id', news_controller.get_news);
router.put('/update/:id', news_controller.update_news);
router.delete('/delete/:id', news_controller.delete_news);
router.get('/get-all', news_controller.getAll_news);