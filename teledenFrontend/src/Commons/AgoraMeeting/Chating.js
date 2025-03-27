import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import "./AgoraStyle.css";

const APP_ID = '4f2102e306e244e88ed165dc12a4bfa7';
const CHANNEL = 'new';

// let client = AgoraRTM.createInstance(APP_ID);
let uid = uuidv4();

const Chating = forwardRef((props, ref) => {
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const { text, client } = props;

  const appendMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useImperativeHandle(ref, () => ({
    sendMessage() {
      if (text === '') return;
      channel?.sendMessage({ text, type: 'text' });
      appendMessage({
        text: text,
        uid,
      });
    }
  }));

  useEffect(() => {
    let connecting = false;

    const connect = async () => {
      if (connecting) return;
      connecting = true;
      try {
        const keys = Object.keys(client);
        let value;
        keys.forEach(key => {
          value = client[key];
        });
        await value.login({ uid, token: null });
        const newChannel = await value.createChannel(CHANNEL);
        await newChannel.join();
        newChannel.on('ChannelMessage', (message, peerId) => {
          appendMessage({
            text: message.text,
            uid: peerId,
          });
        });
        setChannel(newChannel);
      } catch (error) {
        console.error('Error connecting:', error);
      } finally {
        connecting = false;
      }
    };

    connect();

    return () => {
    };
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <main>
      <div className="panel" ref={messagesRef}>
        {messages.map((message, idx) => (
          <div key={idx} className="message">
            {message.uid === uid && (
              <div className="user-self">
                You:&nbsp;
              </div>
            )}
            {message.uid !== uid && (
              <div className="user-them">
                Them:&nbsp;
              </div>
            )}
            <div className="text">{message.text}</div>
          </div>
        ))}
      </div>
    </main>
  );
});

export default Chating;
