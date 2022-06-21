import React, { useEffect, useState } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  const [play, setPlay] = useState(false);
  const [twoCycles, setTwoCycles] = useState(0);
  const [twoCyclesBreak, setTwoCyclesBreak] = useState(0);
  const [threeCycles, setThreeCycles] = useState(0);
  const [threeCyclesBreak, setThreeCyclesBreak] = useState(0);

  console.log(twoCycles, twoCyclesBreak);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setTwoCyclesBreak(0);
    setTwoCycles(0);
    setThreeCycles(0);
    setThreeCyclesBreak(0);
    setBreakLength(1);
    setSessionLength(1);
    setTimingtype("SESSION");
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    if (!timeLeft && timingType === "SESSION") {
      setTwoCycles(twoCycles + 1);
      seTtimeLeft(breakLength * 60);
      setTimingtype("BREAK");
    }
    if (!timeLeft && timingType === "BREAK") {
      setTwoCyclesBreak(twoCyclesBreak + 1);
      seTtimeLeft(sessionLength * 60);
      setTimingtype("SESSION");
    }
  };

  const clock = () => {
    if (play) {
      if (twoCycles === 2 && twoCyclesBreak === 2) {
        setPlay(false);
        clearTimeout(timeout);
      } else if (threeCycles === 3 && threeCyclesBreak === 3) {
        setPlay(false);
        clearTimeout(timeout);
      } else {
        clearTimeout(timeout);
        resetTimer();
      }
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div>
      <div className="wrapper">
        <h2>25 + 5 Clock</h2>
        <div className="break-session-length">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button
                disabled={play}
                onClick={handleBreakIncrease}
                id="break-increment"
              >
                Increase
              </button>
              <strong id="break-length">{breakLength} minute</strong>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                id="break-decrement"
              >
                Decrease
              </button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <button
                disabled={play}
                onClick={handleSessionIncrease}
                id="session-increment"
              >
                Increase
              </button>
              <strong id="session-length">{sessionLength} minute</strong>
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                id="session-decrement"
              >
                Decrease
              </button>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Start</button>
            <div className="dropdown-content">
              <button onClick={handlePlay}>Start/Stop</button>
              <button onClick={handlePlay}>2 Cycles</button>
              <button onClick={handlePlay}>3 Cycles</button>
            </div>
          </div>
          <button onClick={handleReset} id="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
