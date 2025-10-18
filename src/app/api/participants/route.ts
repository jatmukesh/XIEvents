import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🧾 GET all participants
export async function GET() {
  try {
    const participants = await prisma.participant.findMany({
      include: {
        event: true,
        class: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(participants);
  } catch (error) {
    console.error("GET /participants error:", error);
    return NextResponse.json(
      { error: "Failed to fetch participants" },
      { status: 500 }
    );
  }
}

// 🆕 POST - create participant
export async function POST(req: Request) {
  try {
    const { event_id, name, class_id, email } = await req.json();

    if (!event_id || !name || !class_id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.create({
      data: {
        event_id,
        name,
        class_id,
        email,
      },
    });

    return NextResponse.json(participant, { status: 201 });
  } catch (error: any) {
    console.error("POST /participants error:", error);

    // Handle unique constraint
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Participant already registered for this event" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create participant" },
      { status: 500 }
    );
  }
}
