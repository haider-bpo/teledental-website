import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import "./AgoraStyle.css";
import VideoCall from "./VideoCall";
import client from "../../axios-configured";
// const response = await axios.get('https://test.teledental.com/generateToken'
function AgoraToken(props) {
  const { text, patientContactNumber } = props;
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState(null);
  const [joiningLink, setjoiningLink] = useState(null);

  const generateToken = async () => {
    try {
      const response = await client.get(`/api/v1/agora/agoraToken`, {
        params: { channelName: text, patientContactNumber: encodeURI(patientContactNumber) }
      });
      const tokenString = response.token;
      setjoiningLink(response.link);

      if (tokenString) {
        setToken(tokenString);
        console.log("token is???", tokenString, token);
      } else {
        console.error('Token is undefined in the response.');
      }
    } catch (error) {
      console.error('Error generating token:', error.message);
    }
  }


  useEffect(() => {
    if (text !== '') {
      generateToken();
    }
  }, [text]);

  return (
    <>
      <div className="App" style={{ height: "100%", width: "100%", marginTop: "0px" }}>
        {inCall ? (
          <VideoCall setInCall={setInCall} token={token} channel={text} joiningLink={joiningLink} />
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
    </>

  );
}

export default AgoraToken;
