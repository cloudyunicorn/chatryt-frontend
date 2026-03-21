const API_BASE = "http://localhost:8000";

interface ChatApiResponse {
  response: string;
}

export async function sendChatMessage(
  message: string,
  sessionId: string
): Promise<string> {
  const res = await fetch(`${API_BASE}/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!res.ok) {
    throw new Error(`Server error (${res.status})`);
  }

  const data: ChatApiResponse = await res.json();
  return data.response;
}
