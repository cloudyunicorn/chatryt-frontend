import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const path = pathSegments?.join("/") || "";
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${API_BASE}/chat/${path}${searchParams ? `?${searchParams}` : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const path = pathSegments?.join("/") || "";
  const url = `${API_BASE}/chat/${path}`;
  const body = await request.json();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle streaming response
    if (response.headers.get("content-type")?.includes("text/event-stream")) {
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy POST error:", error);
    return NextResponse.json(
      { error: "Failed to post to backend" },
      { status: 500 }
    );
  }
}
