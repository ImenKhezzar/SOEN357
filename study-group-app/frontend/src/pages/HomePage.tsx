import React, { useState } from 'react';
import ResponsiveAppBar from '../components/UI/ResponsiveAppBar';
import PersonalRoomButton from '../components/MeetingRooms/PersonalRoomButton';
import CreateRoomButton from '../components/MeetingRooms/CreateRoomButton';
import JoinRoomButton from '../components/MeetingRooms/JoinRoomButton';
import { authToken, createMeeting } from '../API';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';; 
import TodoList from '../components/TodoList/TodoList'; // Adjust the path as needed
import PlaylistList from '../components/Music/PlaylistList'; // Adjust the path as needed
import MusicPlayer from '../components/Music/MusicPlayer'; // Adjust the path as needed

const HomePage = () => {
    const [meetingId, setMeetingId] = useState<string | null>(null);
    const [inputMeetingId, setInputMeetingId] = useState<string>('');
    const [currentPlaylistLink, setCurrentPlaylistLink] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const authContext = useAuth();

    if (!authContext) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    const {auth } = authContext;

    const handlePlayPlaylist = (link: string) => {
        setCurrentPlaylistLink(link);
    };
    

    const getPersonalRoomId = (username: string) => {
        return btoa(username).replace(/=/g, '');
    };

    const getMeetingAndToken = async (id?: string) => {
        if (meetingId) {
            console.log('Already in a meeting, not joining again.');
            return;
        }
        const newMeetingId = id ?? (await createMeeting({ token: authToken }));
        setMeetingId(newMeetingId);
        navigate(`/room/${newMeetingId}`);
    };

    return (
        <div style={{background: "linear-gradient(90deg, #F7EEFF 0%, #F3F9FF 100%)", height: '100%'}}>
            <ResponsiveAppBar />

            <div className='purple-box' style={{ textAlign: 'left', marginTop:'2em', marginLeft: '4vw', paddingLeft: '3em', color: 'black', width: '88vw'}}>
                {auth && <h3>Welcome, {auth.username}!</h3>}
                <p style={{color: 'grey'}}> Ready to start your productive study session? </p>
            </div>

        <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '4vw', marginTop: '2em'}}>

        <div style={{ flex: '1', marginRight: '2vw' }}>
            <div className='purple-box' style={{ width: '25vw', marginBottom: '1em', padding: '2vw'}}>
            <div style={{ marginBottom: '1em',  }}>
            <span style={{marginRight: '4em'}}><b> Personal Room </b></span>
            <PersonalRoomButton
                        username={auth.username}
                        onClick={() => getMeetingAndToken(getPersonalRoomId(auth.username))}
                    />
            <p style={{color: 'grey'}}> Your private Study Space </p>
            </div>
            </div>
            <div className="purple-box" style={{ width: '25vw', marginBottom: '1em', padding: '2vw'}}>
            <div>
                <span style={{marginRight: '5em'}}><b>Create a Room</b></span>
                <CreateRoomButton onClick={() => getMeetingAndToken()} />
                </div>
            <p style={{color: 'grey'}}> Start a study session with friends </p>
            </div>
            <div className='purple-box' style={{ width: '25vw', padding: '2vw', marginBottom: '2em'}}>
            <div style={{ justifyContent: 'center', marginBottom: '1em', textAlign: 'center' }}>
            <span style={{fontWeight: 'bold', textAlign: 'center'}}><p> Join a Room </p></span>
            <input
                        type="text"
                        placeholder="Enter Meeting Id"
                        onChange={(e) => setInputMeetingId(e.target.value)}
                        style={{marginBottom: '1em', width: '50%', borderRadius: '4px', border: '1px solid #ccc',}}
                    /> <br/>
            
            
            <JoinRoomButton onClick={() => inputMeetingId && getMeetingAndToken(inputMeetingId)} />
            </div>
            </div>
        </div>

        <div style={{ flex: '1', marginRight: '2vw' }}>
            <div className="purple-box" style={{ width: '25vw', padding: '2vw', marginBottom: '1em'}}>
            <div className="music-player">
                <span style={{fontWeight: 'bold', textAlign: 'center'}}><p>🎵 YouTube Playlist Player</p></span>
                    <MusicPlayer playlistLink={currentPlaylistLink} />
                </div>
            </div>
            <div className="playlist-list-container">
                <div className="purple-box" style={{ textAlign: 'left', width: '25vw', padding: '2vw', marginBottom: '2em'}}>
                    <PlaylistList onPlayPlaylist={handlePlayPlaylist} /> 
                </div>
            </div>
        </div>


        <div style={{ flex: '1', marginRight: '2vw' }}>  
            <div className="todo-list-container">
                <div className="purple-box" style={{ textAlign: 'left', width: '25vw', padding: '2vw', marginBottom: '2em'}}> 
                    <span style={{ fontWeight: 'bold' }}><p>Today's Tasks</p></span>
                    <TodoList />
                </div>
            </div>
            
        </div>
        </div>
        </div>
    );
};

export default HomePage;
