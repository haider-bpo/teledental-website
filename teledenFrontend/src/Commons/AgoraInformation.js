import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import Header from "./Header";
import { useLocation } from 'react-router-dom';
import VideoCall from "../../src/Commons/AgoraMeeting/VideoCall";
import Video from "../../src/Commons/AgoraMeeting/Video";

function AgoraInformation() {
  const location = useLocation();
  const [inCall, setInCall] = useState(false);


  // Function to parse query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const queryParams = getQueryParams(location.search);
  const token = queryParams.get('token');
  const channelName = queryParams.get('channelName');

  // try{
  // if (token) {
  //       setToken(token);
  //     } else {
  //       console.error('Token is undefined in the response.');
  //     }
  //   } catch (error) {
  //     console.error('Error generating token:', error.message);
  //   }

  return (
    <>
      <div className="App" style={{ height: "100%", width: "100%", marginTop: "10px" }}>
        {inCall ? (
          <VideoCall setInCall={setInCall} token={token} channel={channelName} />
        ) : (
          <Box textAlign='center'>
            <Button
              style={{ cursor: "pointer" }}
              variant="contained"
              color="secondary"
              onClick={() => setInCall(true)}
            >
              Join Meeting
            </Button>
          </Box>
        )}
      </div>
      <div style={{ marginTop: '100px', marginBottom: '50px' }}>
        Agora Information
      </div>

      <h1>Agora Information</h1>
      <p>Token: {token}</p>
      <p>Channel Name: {channelName}</p>
    </>
  );
}

export default AgoraInformation;
