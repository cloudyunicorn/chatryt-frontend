const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendStreamMessage(
  message: string,
  sessionId: string,
  onChunk: (text: string) => void
): Promise<void> {
  const response = await fetch(`${API_BASE}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!response.ok) {
    throw new Error("Failed to communicate with API");
  }

  if (!response.body) {
    throw new Error("No response body returned from the server");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  try {
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Keep the last partial line in the buffer just in case a chunk was split
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6);
          try {
            const data = JSON.parse(dataStr);
            if (data.content) {
              onChunk(data.content);
            }
          } catch (e) {
            // Ignore parse errors on malformed chunks
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
