
export async function measureNetworkLatency(url: string): Promise<number | null> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        const endTime = Date.now();
        const latency = endTime - startTime;
        return latency;
      } else {
        return null; // Failed response
      }
    } catch (error) {
      console.error("Network latency measurement error:", error);
      return null;
    }
  }
  