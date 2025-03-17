const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlistsController');

router.post('/', playlistsController.createPlaylist)
    .get('/', playlistsController.getUserPlaylists);

router.get('/:id', playlistsController.getPlaylistById)
    .put('/:id', playlistsController.updatePlaylist)
    .delete('/:id', playlistsController.deletePlaylist);

module.exports = router;

