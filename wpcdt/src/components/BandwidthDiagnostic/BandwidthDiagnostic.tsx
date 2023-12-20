import { useEffect, useState } from "react";
import { estimateBandwidth } from "../../helpers/bandWidthMeasurement";
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
});

const BandwidthDiagnostic = () => {
  const [bandwidth, setBandwidth] = useState<number | null>(null);
  console.log(peerConnection);
  useEffect(() => {
    const measureBandwidth = async () => {
      const result = await estimateBandwidth(peerConnection);
      setBandwidth(result);
    };
    measureBandwidth();
  }, []);

  return (
    <div>
      {bandwidth !== null ? (
        <p>Estimated bandwidth: {bandwidth} Kbps</p>
      ) : (
        <p>Measuring bandwidth...</p>
      )}
    </div>
  );
};
export default BandwidthDiagnostic;
