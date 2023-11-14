const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.post('/', itemsController.createItem);
router.get('/', itemsController.getItems);
// Implement other CRUD routes similarly

module.exports = router;
