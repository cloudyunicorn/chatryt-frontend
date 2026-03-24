const API_BASE = "/api";

export async function sendStreamMessage(
  message: string,
  sessionId: string,
  userId: string,
  onChunk: (text: string) => void
): Promise<void> {
  const response = await fetch(`${API_BASE}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId, user_id: userId }),
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

export interface ChatThread {
  id: string;
  title: string;
  updated_at: string;
}

export async function fetchThreads(userId: string): Promise<ChatThread[]> {
  const response = await fetch(`${API_BASE}/chat/threads?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch threads");
  }
  const data = await response.json();
  return data.threads || [];
}

export async function fetchHistory(threadId: string, userId: string): Promise<any[]> {
  const response = await fetch(`${API_BASE}/chat/history/${threadId}?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }
  const data = await response.json();
  return data.messages || [];
}
