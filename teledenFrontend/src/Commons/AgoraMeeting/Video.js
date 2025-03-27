import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useRef, useCallback } from 'react';
import { Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Chating from './Chating';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send'
import InputAdornment from '@mui/material/InputAdornment';
import MessageIcon from '@mui/icons-material/Message';
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useClient } from "./Settings";
import AgoraRTM from 'agora-rtm-sdk';
import "./AgoraStyle.css";
import { useUserContext } from "../../Context/userContext";


const APP_ID = '4f2102e306e244e88ed165dc12a4bfa7';
let client = AgoraRTM.createInstance(APP_ID);

export default function Video(props) {
  const chatingRef = useRef(null);
  const { users, tracks, setStart, setInCall, joiningLink } = props;
  const [gridSpacing, setGridSpacing] = useState(100);
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('00:00');
  const [timer, setTimer] = useState(null);
  const [chat, showChat] = useState(false);
  const [rtmClient, setRtmClient] = useState(null);
  const client = useClient();
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const { refetchPaymentInfo, user } = useUserContext();

  useEffect(() => {
    if (tracks) {
      setTimer(59);
    }
  }, [tracks]);

  useEffect(() => {
    if (timer !== null) {
      const intervalId = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        setTimeRemaining(`${formattedMinutes}:${formattedSeconds}`);
        setTimer(timer + 1);
        if (timer === 0) {
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);


  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenSize());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const connect = async () => {
      try {
        const client = AgoraRTM.createInstance(APP_ID);
        setRtmClient(client);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    };

    connect();
  }, [client]);

  function getScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) {
      return 'large';
    } else if (screenWidth <= 1024 && screenWidth > 768) {
      return 'medium';
    } else if (screenWidth <= 768 && screenWidth > 600) {
      return 'tablet';
    }
    else {
      return 'small';
    }
  }

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  const toggleChat = () => {
    showChat(!chat);
  }

  const handleSendMessage = () => {
    chatingRef.current.sendMessage();
    setText('');
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {user?.model === "dentists" && (<p className="text-center" style={{ overflowWrap: "anywhere" }} >Patient Joining Link   {joiningLink}</p>)}
      <Grid className="main-grid-wrapper" style={{ height: "95vh", width: "100%", justifyContent: "center", backgroundColor: "white", borderRadius: "1.25rem", display: "flex", flexDirection: "row", position: "relative", padding: "1.25rem" }}>
        <button class="button" onClick={toggleChat}>
          <span class="X"></span>
          <span class="Y"></span>
          <div class="close">Close</div>
        </button>
        <Grid className="inner-container-wrapper" style={{ flex: 1, borderRadius: "0.3rem", position: "relative", backgroundColor: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "1.25rem", margin: " 0 20px" }}>
          <Grid className="inner-container" container spacing={gridSpacing} style={{ height: "100%" }}>
            <Grid item lg={users?.length == 0 ? 12 : 6} md={users?.length == 0 ? 12 : 6} xs={12} sm={users?.length == 0 ? 12 : 6}>
              <AgoraVideoPlayer
                videoTrack={tracks[1]}
                style={{
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                }}
              />
            </Grid>
            {users.length > 0 &&
              users.map((user) => {
                if (user.videoTrack) {
                  return (
                    <Grid item xs={12} sm={6}>
                      <AgoraVideoPlayer
                        videoTrack={user.videoTrack}
                        key={user.uid}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </Grid>
                  );
                } else return null;
              })}
          </Grid>
          <Grid className="controls" container spacing={2} style={{ margin: "0 auto", marginTop: "-60px", width: "fit-content", display: (chat && screenSize === "small") ? 'none' : 'flex', flexWrap: (screenSize === "small" ? 'wrap' : 'nowrap') }}>
            <Grid item>
              <Button
                variant="contained"
                style={{ borderRadius: "10px", color: "white", backgroundColor: trackState.audio ? "#3e4344" : "red" }}
                onClick={() => mute("audio")}
              >
                {trackState.audio ? <MicIcon /> : <MicOffIcon />}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{ borderRadius: "0.6rem", color: "white", backgroundColor: trackState.audio ? "#3e4344" : "red" }}
                onClick={() => mute("video")}
              >
                {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className="end-call"
                onClick={() => toggleChat()}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "0.6rem", color: "white", backgroundColor: trackState.audio ? "#3e4344" : "red" }}
              >
                <MessageIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className="end-call"
                onClick={() => leaveChannel()}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: "0.6rem", color: "white", backgroundColor: "red" }}
              >
                <CallEndIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid lg={12} md={12} xs={6} sm={6} className="chatting-grid" style={{ flex: 0.3, marginLeft: "0 auto", backgroundColor: "#edf0f5", borderRadius: "5px", display: chat ? 'block' : 'none' }}>
          <div className="chatting-grid-inner" style={{
            display: 'flex',
            paddingTop: '1.25rem',
            justifyContent: "space-around",
          }}>
            {/* First div */}
            <div lg={12} md={6} xs={12} sm={6} className="joining-timer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4087f2',
              fontSize: '1.12rem',
              marginBottom: '1.2rem',
              backgroundColor: 'white',
              color: 'black',
              marginLeft: '0 auto',
              padding: '0.9rem',
              borderRadius: '0.3rem',
              height: '3.13rem',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {timeRemaining}
            </div>

            {/* Second div */}
            <div lg={12} md={6} xs={12} sm={6} className="users-count" style={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              fontSize: '1.13rem',
              marginBottom: '0.6rem',
              justifyContent: "center",
              backgroundColor: '#4087f2',
              color: 'white',
              padding: '0.9rem',
              borderRadius: '0.3rem',
              height: '3.13rem',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.13rem'
            }}>
              <div lg={12} md={6} xs={12} sm={6} className="user-Icon" style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar style={{ background: 'transparent' }}>
                  <PersonIcon />
                </Avatar>
                {users.length}
              </div>
            </div>
          </div>
          <div lg={12} md={6} xs={12} sm={6} className="message-participant" style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="messages-title" style={{ color: "#4087f2", fontSize: "18px", marginBottom: "10px", backgroundColor: "#4087f2", color: "white", padding: "9px", borderRadius: "0.3rem", width: "90px", textAlign: "center", fontWeight: "bold", fontSize: "0.9rem" }}>Message</div>
            <div className="participant" style={{ color: "white", fontSize: "1.13rem", marginBottom: "0.6rem", backgroundColor: "white", color: "black", padding: "0.5rem", borderRadius: "0.3rem", width: "8.13rem", textAlign: "center", fontWeight: "bold", fontSize: "0.9rem" }}>Participant</div>
          </div>
          <div className="chatting">
            <Chating ref={chatingRef} text={text} client={rtmClient && { rtmClient }} /></div>
          <div className="send-message-input" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "12px", borderRadius: "0.3rem" }}>
            <TextField
              value={text}
              style={{ backgroundColor: "white", border: "0px", padding: "0.75rem", borderRadius: "0.8rem" }}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ border: "0px" }}>
                    <Button onClick={handleSendMessage} style={{ cursor: 'pointer', padding: '0.6rem' }}>
                      <SendIcon />
                    </Button>
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: { paddingRight: 0 } // To remove the extra padding on the right
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
