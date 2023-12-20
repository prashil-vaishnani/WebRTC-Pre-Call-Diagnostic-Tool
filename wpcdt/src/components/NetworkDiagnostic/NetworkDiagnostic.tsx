import { useState } from "react";
import { measureNetworkLatency } from "../../helpers/NetworkLatencyMeasurement";

const NetworkDiagnostic = () => {
  const [latency, setLatency] = useState<number | null>(null);

  const handleMeasureLatency = async () => {
    const urlToTest = "http://localhost:3000/down"; 
    const result = await measureNetworkLatency(urlToTest);
    setLatency(result);
  };

  return (
    <div>
      <button onClick={handleMeasureLatency}>Measure Network Latency</button>
      {latency !== null ? (
        <p>Network latency: {latency} ms</p>
      ) : (
        <p>Click the button to measure latency.</p>
      )}
    </div>
  );
};

export default NetworkDiagnostic;
