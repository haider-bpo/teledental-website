/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "../Commons/Participant";
import { useParams } from "react-router-dom";
import { VideoOnIcon, VideoOffIcon } from "../assets/svg/VideoOffIcon";
import { MicOnIcon, MicOffIcon } from "../assets/svg/MicOffIcon";
import { Spin } from "antd";

const VideoChat = () => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [videoStatus, setVideoStatus] = useState(true);
  const [audioStatus, setAudioStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(
    window.location.search ? window.location.search.split("=")[1] : ""
  );

  const { id: roomName } = useParams();

  useEffect(() => {
    setLoading(true);
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName,
    })
      .then((room) => {
        setLoading(false);
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      })
      .catch((err) => {
        setLoading(false);
      });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);
  const videoAction = () => {
    setVideoStatus(!videoStatus);
    if (!videoStatus == true) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    } else {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    }
  };
  const audioAction = () => {
    setAudioStatus(!audioStatus);
    if (!audioStatus == true) {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    } else {
      room.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    }
  };
  const remoteParticipants = participants.map((participant) => (
    <Participant
      key={participant.sid}
      participant={participant}
      audioStatus={audioStatus}
    />
  ));

  if (loading)
    return (
      <div className="spin">
        <Spin />
      </div>
    );

  return (
    <>
      <div className="call-footer">
        <div className="room">
          {/* <button onClick={handleLogout}>Log out</button> */}
          <div className="row">
            <div className="col-md-6">
              <div className="local-participant">
                {room ? (
                  <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                    audioStatus={audioStatus}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="remote-participants">{remoteParticipants}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="call-footer">
        <div className="call-icons">
          <ul className="call-items">
            <li className="call-item">
              <a
                onClick={videoAction}
                title="Enable Video"
                data-placement="top"
                data-toggle="tooltip"
              >
                {videoStatus ? <VideoOnIcon /> : <VideoOffIcon />}
              </a>
            </li>
            <li className="call-item">
              <a
                onClick={audioAction}
                title="Mute Audio"
                data-placement="top"
                data-toggle="tooltip"
              >
                {audioStatus ? <MicOnIcon /> : <MicOffIcon />}
              </a>
            </li>
          </ul>
          <div className="end-call">
            <a href="javascript:void(0);">
              <i className="fa fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoChat;
