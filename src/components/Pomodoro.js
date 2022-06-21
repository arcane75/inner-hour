import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
// import "./Pomodoro.css";

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
    setBreakLength(5);
    setSessionLength(25);
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

  const textStyle = {
    fontWeight: "bold",
    fontSize: "2em",
    mt: 1,
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ mb: 5 }}>
      <Box>
        <Box sx={{ mb: 5, border: "5px solid #f2f2f2" }}>
          <Typography sx={textStyle} align="center">
            25 + 5 Pomodoro Clock
          </Typography>
        </Box>

        <Box sx={{ border: "5px solid #f2f2f2", pb: 5, pl: 2 }}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Box>
                <Typography sx={textStyle} align="center">
                  Break Length
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    disabled={play}
                    onClick={handleBreakIncrease}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Increase
                  </Button>
                  <strong>{breakLength} minute </strong>
                  <Button
                    disabled={play}
                    onClick={handleBreakDecrease}
                    variant="outlined"
                    sx={{ ml: 1 }}
                  >
                    Decrease
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box>
                <Typography sx={textStyle} align="center">
                  Session Length
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Button
                    disabled={play}
                    onClick={handleSessionIncrease}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Increase
                  </Button>
                  <strong> {sessionLength} minute </strong>
                  <Button
                    disabled={play}
                    onClick={handleSessionDecrease}
                    variant="outlined"
                    sx={{ ml: 1 }}
                  >
                    Decrease
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              border: "3px solid #6E6E6E",
              borderRadius: "10px",
              margin: "20px 120px",
            }}
          >
            <Typography sx={textStyle} align="center">
              {title}
            </Typography>
            <Typography sx={textStyle} align="center">
              {timeFormatter()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              sx={{mr: 2}}
            >
              Select Clock
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handlePlay}>Start/Stop</MenuItem>
              <MenuItem onClick={handlePlay}>2 Cycles</MenuItem>
              <MenuItem onClick={handlePlay}>3 Cycles</MenuItem>
            </Menu>

            <Button onClick={handleReset} variant="outlined">
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Pomodoro;
