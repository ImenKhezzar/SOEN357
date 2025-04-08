// import React, { useState, useEffect } from "react";
// import { Button, TextField, Typography, Box } from "@mui/material";
// import alarmSound from '../../assets/alarm.mp3';

// const Timer: React.FC = () => {
//   const [workTime, setWorkTime] = useState(25); // Default work time in minutes
//   const [breakTime, setBreakTime] = useState(5); // Default break time in minutes
//   const [timeLeft, setTimeLeft] = useState(workTime * 60); // Time left in seconds
//   const [isRunning, setIsRunning] = useState(false);
//   const [isWorkSession, setIsWorkSession] = useState(true); // Track if it's a work or break session
//   const [sessionMessage, setSessionMessage] = useState("Work Time"); // Message for the current session
//   const [showAlarm, setShowAlarm] = useState(false); // Visual alarm state

//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

//     if (isRunning) {
//       timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer!);
//             triggerAlarm(); // Trigger visual and sound alarm
//             const nextSession = !isWorkSession;
//             setIsWorkSession(nextSession);
//             setSessionMessage(nextSession ? "Break Time" : "Work Time");
//             return nextSession ? breakTime * 60 : workTime * 60;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [isRunning, isWorkSession, workTime, breakTime]);

//   const triggerAlarm = () => {
//     // Show visual alarm
//     setShowAlarm(true);
//     setTimeout(() => setShowAlarm(false), 3000);

//     // Play sound alarm
//     const audio = new Audio(alarmSound);
//     audio.volume = 0.5;
//     audio.play().catch((err) => {
//       console.error("Audio playback failed:", err);
//     });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleStartPause = () => {
//     setIsRunning((prev) => !prev);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
//     setSessionMessage(isWorkSession ? "Work Time" : "Break Time");
//   };

//   const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value, 10);

//     if (isNaN(value)){
//         setWorkTime(1);
//     }

//     if (!isNaN(value) && value > 0) {
//       setWorkTime(value);
//       if (isWorkSession) setTimeLeft(value * 60);
//     }
//   };

//   const handleBreakTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(event.target.value, 10);

//     if (isNaN(value)){
//         setBreakTime(1);
//     }

//     if (!isNaN(value) && value > 0) {
//       setBreakTime(value);
//       if (!isWorkSession) setTimeLeft(value * 60);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
//       {showAlarm && (
//         <Box
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(255, 0, 0, 0.7)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <Typography variant="h3" style={{ color: "#fff", fontWeight: "bold" }}>
//             {isWorkSession ? "Break Time!" : "Work Time!"}
//           </Typography>
//         </Box>
//       )}
//       <Typography variant="h4">{sessionMessage}</Typography>
//       <Typography variant="h2">{formatTime(timeLeft)}</Typography>
//       <div style={{ display: "flex", gap: "16px" }}>
//         <Button variant="contained" onClick={handleStartPause}>
//           {isRunning ? "Pause" : "Start"}
//         </Button>
//         <Button variant="outlined" onClick={handleReset}>
//           Reset
//         </Button>
//       </div>
//       <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
//         <TextField
//           label="Work Time (min)"
//           type="number"
//           value={workTime}
//           onChange={handleWorkTimeChange}
//           variant="outlined"
//         />
//         <TextField
//           label="Break Time (min)"
//           type="number"
//           value={breakTime}
//           onChange={handleBreakTimeChange}
//           variant="outlined"
//         />
//       </div>
//     </div>
//   );
// };

// export default Timer;

import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import alarmSound from '../../assets/alarm.mp3';

const Timer: React.FC = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [sessionMessage, setSessionMessage] = useState("Work Time");
  const [showAlarm, setShowAlarm] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            triggerAlarm();
            const nextSession = !isWorkSession;
            setIsWorkSession(nextSession);
            setSessionMessage(nextSession ? "Break Time" : "Work Time");
            return nextSession ? breakTime * 60 : workTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isWorkSession, workTime, breakTime]);

  const triggerAlarm = () => {
    setShowAlarm(true);
    setTimeout(() => setShowAlarm(false), 3000);

    const audio = new Audio(alarmSound);
    audio.volume = 0.5;
    audio.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
    setSessionMessage(isWorkSession ? "Work Time" : "Break Time");
  };

  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setWorkTime(value);
      if (isWorkSession) setTimeLeft(value * 60);
    }
  };

  const handleBreakTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setBreakTime(value);
      if (!isWorkSession) setTimeLeft(value * 60);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "32px",
        background: "#fff0f0",
        borderRadius: "24px",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      {showAlarm && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Typography variant="h3" style={{ color: "#fff", fontWeight: "bold" }}>
            {isWorkSession ? "Break Time!" : "Work Time!"}
          </Typography>
        </Box>
      )}

      <Typography variant="h2" sx={{ fontSize: "48px" }}>🍅</Typography>

      <Typography variant="h4" sx={{ fontWeight: "bold" }}>{sessionMessage}</Typography>

      <Box
        sx={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #ff6347, #cc0000)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px rgba(255, 99, 71, 0.7)",
          border: "5px solid #ff9999",
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "white", fontWeight: "bold", userSelect: "none" }}
        >
          {formatTime(timeLeft)}
        </Typography>
      </Box>

      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant="contained" color="error" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <TextField
          label="Work (min)"
          type="number"
          value={workTime}
          onChange={handleWorkTimeChange}
          variant="outlined"
        />
        <TextField
          label="Break (min)"
          type="number"
          value={breakTime}
          onChange={handleBreakTimeChange}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Timer;
