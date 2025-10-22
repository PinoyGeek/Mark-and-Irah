import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for messages
const messages: Array<{
  id: string
  name: string
  message: string
  timestamp: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message } = body

    // Validation
    if (!name || !message || typeof name !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    if (name.trim().length === 0 || message.trim().length === 0) {
      return NextResponse.json({ error: "Name and message cannot be empty" }, { status: 400 })
    }

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: "just now",
    }

    messages.unshift(newMessage)

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error("Error processing message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(messages)
}
