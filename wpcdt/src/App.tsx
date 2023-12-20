import "./App.css";
import BandwidthDiagnostic from "./components/BandwidthDiagnostic/BandwidthDiagnostic";
import NetworkDiagnostic from "./components/NetworkDiagnostic/NetworkDiagnostic";
import PacketLossDiagnostic from "./components/PacketLossDiagnostic/PacketLossDiagnostic";

function App() {
  return (
    <>
      <BandwidthDiagnostic />
      <br />
      <br />
      <NetworkDiagnostic />
      <br />
      <br />
      <PacketLossDiagnostic />
    </>
  );
}

export default App;
