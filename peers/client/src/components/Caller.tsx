// CallerComponent.tsx
import React, { useEffect, useState } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

interface CallerProps {
  stream: MediaStream;
  setRemoteStream: (stream: MediaStream) => void;
}

const socket = io("http://localhost:3001"); // Replace with your server URL

const CallerComponent: React.FC<CallerProps> = ({
  stream,
  setRemoteStream,
}) => {
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  console.log(peer, "caller");
  useEffect(() => {
    const peer = new SimplePeer({ initiator: true, stream });

    peer.on("signal", (data) => {
      socket.emit("offer", data);
    });

    // Handle incoming answer and ice candidates
    socket.on("answer", (data) => {
      peer.signal(data);
    });

    socket.on("ice-candidate", (data) => {
      peer.signal(data);
    });
    peer.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
    });

    setPeer(peer);
  }, [stream]);

  return (
    <div>
      {/* Your video stream and UI for the caller */}
      <video
        autoPlay
        ref={(videoRef) => videoRef && (videoRef.srcObject = stream)}
      />
    </div>
  );
};

export default CallerComponent;
