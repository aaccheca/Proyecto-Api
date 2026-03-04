const express = require('express');
const itemsCtrl = require('./controllers/itemsController');

const router = express.Router();

router.get('/items', itemsCtrl.getAll);
router.get('/items/:id', itemsCtrl.getById);
router.post('/items', itemsCtrl.create);
router.put('/items/:id', itemsCtrl.update);
router.delete('/items/:id', itemsCtrl.remove);

module.exports = router;