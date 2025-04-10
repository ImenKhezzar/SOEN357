import React from 'react';
import Stack from '@mui/material/Stack';
import PersonalRoomButton from './PersonalRoomButton';
import CreateRoomButton from './CreateRoomButton';
import JoinRoomButton from './JoinRoomButton';

interface StartStudyingProps {
    username: string;
    onPersonalRoomClick: () => void;
    onCreateRoomClick: () => void;
    onJoinRoomClick: (meetingId: string) => void;
    onMeetingIdChange: (meetingId: string) => void;
}

const StartStudying: React.FC<StartStudyingProps> = ({
    username,
    onPersonalRoomClick,
    onCreateRoomClick,
    onJoinRoomClick,
    onMeetingIdChange,
}) => {
    return (
        <div className="start-studying-container">
            <div
                className="white-box"
                style={{
                    width: '100%',
                    maxWidth: '40%',
                    maxHeight: '80vw',
                    margin: 'auto',
                }}
            >
                <Stack spacing={2} direction={'column'}>
                    <h3>Start Studying</h3>
                    <PersonalRoomButton username={username} onClick={onPersonalRoomClick} />
                    <input
                        type="text"
                        placeholder="Enter Meeting Id"
                        onChange={(e) => onMeetingIdChange(e.target.value)}
                    />
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ width: '100%', justifyContent: 'space-between' }}
                    >
                        <CreateRoomButton onClick={onCreateRoomClick} />
                        <JoinRoomButton onClick={() => onJoinRoomClick('')} />
                    </Stack>
                </Stack>
            </div>
        </div>
    );
};

export default StartStudying;
