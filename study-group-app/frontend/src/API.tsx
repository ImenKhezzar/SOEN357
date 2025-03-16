//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1MjUwZWNkMC1kZmU1LTQ4YjQtODQzNC05ZWM0MGQwMmQ1YzUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0MTkyMTUwNiwiZXhwIjoxNzQyNTI2MzA2fQ.6Q4aFHB_EoVgindhsy2wo6lr7dOXExLOLBsRKXezE7o";

// API call to create a meeting
export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};