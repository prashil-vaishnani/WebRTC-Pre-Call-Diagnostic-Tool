import { useEffect, useState } from "react";
import { measurePacketLoss } from "../../helpers/PacketLossMeasurement";

const peerConnection = new RTCPeerConnection();

const PacketLossDiagnostic = () => {
  const [packetLossRate, setPacketLossRate] = useState<number | null>(null);

  useEffect(() => {
    const measureLossRate = async () => {
      const result = await measurePacketLoss(peerConnection);
      setPacketLossRate(result);
    };
    measureLossRate();
  }, []);

  return (
    <div>
      {packetLossRate !== null ? (
        <p>Packet loss rate: {packetLossRate.toFixed(2)}%</p>
      ) : (
        <p>Measuring packet loss rate...</p>
      )}
    </div>
  );
};

export default PacketLossDiagnostic;
