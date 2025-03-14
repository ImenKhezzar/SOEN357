const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.post('/', tasksController.createTask)
    .get('/user', tasksController.getUserTasks);

router.get('/:id', tasksController.getTaskById)
    .put('/:id/name', tasksController.updateTaskName)
    .put('/:id/status', tasksController.updateTaskStatus)
    .delete('/:id', tasksController.deleteTask);

module.exports = router;

