import "./App.css";
import "./index.css";
import { Box } from "./Box.js";
import React, { useState, useEffect } from "react";

function App() {
  const [targetTime, setTargetTime] = useState(new Date().toISOString());
  const [timeLeft, setTimeLeft] = useState({});
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  function calculateTimeLeft() {
    const difference = +new Date(targetTime) - +new Date();
    console.log(difference);
    let timeLeft = {};
    if (difference < 0) {
      setShowMessage(true);
      setMessage("The countdown is over! What's next on your adventure?");
      setCountdownStarted(false);
    }
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      if (timeLeft.days >= 100) {
        setShowMessage(true);
        setMessage("Selected time is more than 100 days");
        setCountdownStarted(false);
      } else {
        setShowMessage(false);
      }
    }

    return timeLeft;
  }

  const handleCancel = () => {
    setCountdownStarted(false);
  };
  
  useEffect(() => {
    console.log("time left changed : ", timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (countdownStarted) {
      const timerInterval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => {
        console.log("cleanup function called");
        clearInterval(timerInterval);
      };
    }
  }, [countdownStarted]);

  const handleStartCountdown = () => {
    setCountdownStarted(true);
  };
  return (
    <div className="App">
      <div className="flex flex-col items-center pt-[8%] gap-4">
        <h1 className="font-bold text-4xl">
          <span className="text-white">Countdown </span>
          <span className="text-[#af00fe]">Timer</span>
        </h1>
        <input
          className="p-2 bg-[#88b0ff] border rounded-lg border-2 text-white"
          type="datetime-local"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={handleStartCountdown}
            className="p-2 bg-[#88b0ff] border rounded-lg border-2 text-white"
          >
            Start Timer
          </button>
          <button
            onClick={handleCancel}
            className="p-2 bg-[#88b0ff] border rounded-lg border-2 text-white"
          >
            Cancel
          </button>
        </div>

        {showMessage ? (
          <p className="text-2xl text-[#e11dff] font-bold mt-2">{message}</p>
        ) : (
          <div className="flex gap-2 text-center">
            <Box value={timeLeft.days} timePlaceholder="Days" />
            <Box value={timeLeft.hours} timePlaceholder="hours" />
            <Box value={timeLeft.minutes} timePlaceholder="minutes" />
            <Box value={timeLeft.seconds} timePlaceholder="seconds" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
