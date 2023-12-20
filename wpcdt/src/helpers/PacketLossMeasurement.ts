export async function measurePacketLoss(
  peerConnection: RTCPeerConnection
): Promise<number | null> {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const stats = await peerConnection.getStats();
    let packetsSent = 0;
    let packetsLost = 0;
    stats.forEach((report) => {
      if (report.type === "outbound-rtp" && report.mediaType === "video") {
        packetsSent = report.packetsSent || 0;
      } else if (
        report.type === "inbound-rtp" &&
        report.mediaType === "video"
      ) {
        packetsLost = report.packetsLost || 0;
      }
    });
    const packetLossRate = (packetsLost / packetsSent) * 100;
    return packetLossRate;
  } catch (error) {
    console.error("Packet loss measurement error:", error);
    return null;
  }
}
