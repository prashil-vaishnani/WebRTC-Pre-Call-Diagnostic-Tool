export async function estimateBandwidth(
  peerConnection: RTCPeerConnection
): Promise<number | null> {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const startStats = await peerConnection.getStats();
    console.log(startStats);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const endStats = await peerConnection.getStats();
    console.log(endStats, "eeeeeeee");
    let bytesSentStart = 0;
    let bytesReceivedStart = 0;
    let bytesSentEnd = 0;
    let bytesReceivedEnd = 0;

    startStats.forEach((report) => {
      console.log(report);
      if (report.type === "outbound-rtp") {
        bytesSentStart += report.bytesSent || 0;
      } else if (report.type === "inbound-rtp") {
        bytesReceivedStart += report.bytesReceived || 0;
      }
    });

    endStats.forEach((report) => {
      if (report.type === "outbound-rtp") {
        bytesSentEnd += report.bytesSent || 0;
      } else if (report.type === "inbound-rtp") {
        bytesReceivedEnd += report.bytesReceived || 0;
      }
    });

    const bandwidth =
      ((bytesSentEnd - bytesSentStart + bytesReceivedEnd - bytesReceivedStart) *
        8) /
      1000; // in Kbps
    return bandwidth;
  } catch (error) {
    console.error("Bandwidth estimation error:", error);
    return null;
  }
}

// export async function checker(peerConnection: RTCPeerConnection) {
//   setInterval(async () => {
//     try {
//       const startStats = await peerConnection.getStats();
//       console.log(startStats);

//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const endStats = await peerConnection.getStats();
//       console.log(endStats, "eeeeeeee");

//       let bytesSentStart = 0;
//       let bytesReceivedStart = 0;
//       let bytesSentEnd = 0;
//       let bytesReceivedEnd = 0;

//       startStats.forEach((report) => {
//         console.log(report);
//         if (report.type === "outbound-rtp") {
//           const outboundRtp = report as RTCOutboundRtpStreamStats;
//           bytesSentStart += outboundRtp.bytesSent || 0;
//         } else if (report.type === "inbound-rtp") {
//           const inboundRtp = report as RTCInboundRtpStreamStats;
//           bytesReceivedStart += inboundRtp.bytesReceived || 0;
//         }
//       });

//       endStats.forEach((report) => {
//         if (report.type === "outbound-rtp") {
//           const outboundRtp = report as RTCOutboundRtpStreamStats;
//           bytesSentEnd += outboundRtp.bytesSent || 0;
//         } else if (report.type === "inbound-rtp") {
//           const inboundRtp = report as RTCInboundRtpStreamStats;
//           bytesReceivedEnd += inboundRtp.bytesReceived || 0;
//         }
//       });

//       const bandwidth =
//         ((bytesSentEnd - bytesSentStart + bytesReceivedEnd - bytesReceivedStart) *
//           8) /
//         1000; // in Kbps
//       console.log("Bandwidth estimation:", bandwidth);
//     } catch (error) {
//       console.error("Bandwidth estimation error:", error);
//     }
//   }, 2000);
// }
