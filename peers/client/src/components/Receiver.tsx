// ReceiverComponent.tsx
import React, { useEffect, useState } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

interface ReceiverProps {
  remoteStream: MediaStream;
}

const socket = io("http://localhost:3001"); // Replace with your server URL

const ReceiverComponent: React.FC<ReceiverProps> = ({ remoteStream }) => {
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  console.log(peer, "receiver");
  useEffect(() => {
    const peer = new SimplePeer({ stream: remoteStream });

    peer.on("signal", (data) => {
      socket.emit("answer", data);
    });

    // Handle incoming offer and ice candidates
    socket.on("offer", (data) => {
      peer.signal(data);
    });

    socket.on("ice-candidate", (data) => {
      peer.signal(data);
    });

    setPeer(peer);
  }, [remoteStream]);

  return (
    <div>
      {/* Your video stream and UI for the receiver */}
      <video
        autoPlay
        ref={(videoRef) => videoRef && (videoRef.srcObject = remoteStream)}
      />
    </div>
  );
};

export default ReceiverComponent;
