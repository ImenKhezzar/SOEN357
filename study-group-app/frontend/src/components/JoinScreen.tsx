import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function JoinScreen({
  getMeetingAndToken,
}: {
  getMeetingAndToken: (meeting?: string) => void;
}) {
  const [meetingId, setMeetingId] = useState<string | undefined>();
  const onClick = async () => {
    getMeetingAndToken(meetingId);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      {/* <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button> */}

      <Stack
        spacing={2}
        direction="row"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: "#fff",
            color: "#374151",
            border: "1px solid #374151",
            width: "50%",
          }}
          onClick={() => getMeetingAndToken()}
        >
          Create Room
        </Button>
        <Button
          variant="outlined"
          startIcon={<GroupsIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: "#fff",
            color: "#374151",
            border: "1px solid #374151",
            width: "50%",
          }}
          onClick={onClick}
        >
          Join Room{" "}
        </Button>
      </Stack>
    </div>
  );
}
