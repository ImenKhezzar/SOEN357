const express = require('express');
const router = express.Router();
const studyRoomsController = require('../controllers/studyRoomsController');

router.get('/', studyRoomsController.getStudyRooms)
    .post('/', studyRoomsController.createStudyRoom)
    .get('/user', studyRoomsController.getUserStudyRooms)
;

router.get('/:id', studyRoomsController.getStudyRoomById)
    .put('/:id', studyRoomsController.updateStudyRoom)
    .delete('/:id', studyRoomsController.deleteStudyRoom);

module.exports = router;

