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
        gap: "16px", // Reduced gap
        padding: "16px", // Reduced padding
        background: "#fff0f0",
        borderRadius: "16px", // Reduced border radius
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", // Reduced shadow
        maxWidth: "250px", // Reduced max width
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
          <Typography variant="h5" style={{ color: "#fff", fontWeight: "bold" }}>
            {isWorkSession ? "Break Time!" : "Work Time!"}
          </Typography>
        </Box>
      )}

      <Typography variant="h4" sx={{ fontSize: "32px" }}>🍅</Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{sessionMessage}</Typography>

      <Box
        sx={{
          width: 150, // Reduced size
          height: 150, // Reduced size
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #ff6347, #cc0000)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(255, 99, 71, 0.7)", // Reduced shadow
          border: "3px solid #ff9999", // Reduced border width
          position: "relative",
        }}
      >
        <Typography
          variant="h5" // Reduced font size
          sx={{ color: "white", fontWeight: "bold", userSelect: "none" }}
        >
          {formatTime(timeLeft)}
        </Typography>
      </Box>

      <div style={{ display: "flex", gap: "8px" }}> {/* Reduced gap */}
        <Button variant="contained" color="error" onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}> {/* Reduced gap */}
        <TextField
          label="Work (min)"
          type="number"
          value={workTime}
          onChange={handleWorkTimeChange}
          variant="outlined"
          size="small" // Reduced size
        />
        <TextField
          label="Break (min)"
          type="number"
          value={breakTime}
          onChange={handleBreakTimeChange}
          variant="outlined"
          size="small" // Reduced size
        />
      </div>
    </div>
  );
};

export default Timer;
