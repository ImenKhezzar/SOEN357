import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface PlaylistProps {
    playlist: {
        id: number;
        name: string;
        link: string;
    };
    updatePlaylist: (id: number, name: string, link: string) => void;
    deletePlaylist: (id: number) => void;
    playPlaylist: (link: string) => void; 
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, updatePlaylist, deletePlaylist, playPlaylist }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playlist.name);
    const [newLink, setNewLink] = useState(playlist.link);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLink(e.target.value);
    };

    const handleSave = () => {
        if (newName.trim() === '' || newLink.trim() === '') {
            setNewName(playlist.name);
            setNewLink(playlist.link);
        } else {
            updatePlaylist(playlist.id, newName, newLink);
        }
        setIsEditing(false);
    };

    return (
        <div className="list">
            {isEditing ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <TextField
                        type="text"
                        variant="standard"
                        value={newName}
                        onChange={handleNameChange}
                        autoFocus
                        sx={{
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#9387B4',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Inter, sans-serif', 
                            },
                            marginBottom: '10px',
                        }}
                    />
                    <TextField
                        type="text"
                        variant="standard"
                        value={newLink}
                        onChange={handleLinkChange}
                        placeholder="Link to playlist"
                        sx={{
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#9387B4',
                            },
                            '& .MuiInputBase-input': {
                                fontFamily: 'Inter, sans-serif',
                            },
                        }}
                    />
                    <Button onClick={handleSave} variant="contained" className='submit-button' style={{ marginTop: '10px' }}>
                        Save
                    </Button>
                </div>
            ) : (
                <span
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {playlist.name}
                </span>
            )}
            <IconButton
                aria-label="play"
                onClick={() => playPlaylist(playlist.link)}
                style={{ marginLeft: 'auto' }}
            >
                <PlayArrowIcon />
            </IconButton>
            <IconButton
                aria-label="delete"
                onClick={() => deletePlaylist(playlist.id)}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default Playlist;