import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Playlist from './Playlist';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface PlaylistType {
    id: number;
    name: string;
    link: string;
}

interface PlaylistListProps {
    onPlayPlaylist: (link: string) => void; 
}

const PlaylistList: React.FC<PlaylistListProps> = ({ onPlayPlaylist }) => {
    const axiosPrivate = useAxiosPrivate();
    const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

    useEffect(() => {
        getPlaylists();
    }, []);

    const getPlaylists = async () => {
        try {
            const response = await axiosPrivate.get('/playlists/');
            setPlaylists(response.data.playlists);
        } catch (err) {
            console.error('Failed to get playlists', err);
        }
    };

    const addPlaylist = async () => {
        try {
            await axiosPrivate.post('/playlists/', { name: 'New Playlist', link: 'https://example.com' });
            getPlaylists();
        } catch (err) {
            console.error('Failed to add playlist', err);
        }
    };

    const updatePlaylist = async (id: number, name: string, link: string) => {
        if (!name.trim() || !link.trim()) return; // Don't update if the name or link is empty
        try {
            await axiosPrivate.put(`/playlists/${id}`, { name, link });
            setPlaylists(playlists.map(playlist =>
                playlist.id === id ? { ...playlist, name, link } : playlist
            ));
        } catch (err) {
            console.error('Failed to update playlist', err);
        }
    };

    const deletePlaylist = async (id: number) => {
        try {
            await axiosPrivate.delete(`/playlists/${id}`);
            setPlaylists(playlists.filter(playlist => playlist.id !== id));
        } catch (err) {
            console.error('Failed to delete playlist', err);
        }
    };

    return (
        <div>
            <div>
                <h2>My Playlists</h2>
                {playlists.length === 0 ? (
                    <p>No playlists available!</p>
                ) : (
                    playlists.map(playlist => (
                        <Playlist
                            key={playlist.id}
                            playlist={playlist}
                            updatePlaylist={updatePlaylist}
                            deletePlaylist={deletePlaylist}
                            playPlaylist={onPlayPlaylist}
                        />
                    ))
                )}
                <div className="add-list-container">
                    <Button variant="text" onClick={addPlaylist} className='add-list-button'>+ Add Playlist</Button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistList;