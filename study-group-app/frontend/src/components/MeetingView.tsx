import { useMeeting } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";
import { useNavigate, useParams } from "react-router-dom";
import Draggable from "react-draggable";

const MeetingView = () => {
  const navigate = useNavigate();

  const { join, leave, end, participants } = useMeeting({
    onParticipantJoined: (participant) => {
      console.log("Participant Joined:", participant);
    },
  });

  useEffect(() => {
    if (participants.size === 0) {
      console.log("Joining meeting...");
      join();
    } else {
      console.log("Already joined, skipping...");
    }
  }, [join, participants.size]);

  useEffect(() => {
    console.log("Current participants:", Array.from(participants.keys()));
  }, [participants]);

  const handleLeave = () => {
    leave();
    navigate("/homepage");
  };

  const handleEndMeeting = () => {
    end();
    navigate("/homepage");
  };

  return (
    <div className="meeting-room">
      <Draggable>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column", // fill top to bottom, then new column
            gridTemplateRows: "repeat(4, auto)", // 4 per column
            gap: "20px",
            maxHeight: "80vh",
            width: "100%",
            alignItems: "start",
          }}
        >
          {Array.from(participants.keys()).map((participantId) => (
            <ParticipantView
              key={participantId}
              participantId={participantId}
            />
          ))}
        </div>
      </Draggable>
      <div className="controls">
        <Controls
          handleLeave={handleLeave}
          handleEndMeeting={handleEndMeeting}
        />
      </div>
    </div>
  );
};

export default MeetingView;
