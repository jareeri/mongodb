const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const usersController = require('../controllers/usersController');

router.get('/', usersController.verifyToken, tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
