//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken: string = import.meta.env.VITE_VIDEO_SDK_TOKEN;

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