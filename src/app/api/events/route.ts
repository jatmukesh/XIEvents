import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        fest: true,
        created_by: true,
        winners: true,
        photos: true,
      },
      orderBy: { date: "asc" },
    });

    // Always return an array
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /events error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/events
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { fest_id, name, description, date, venue } = await req.json();

    if (!fest_id || !name || !description || !date || !venue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        fest_id,
        name,
        description,
        date: new Date(date),
        venue,
        created_by_id: Number(session.user.id),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /events error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT /api/events
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, name, description, date, venue } = await req.json();
    if (!id || !name || !description || !date || !venue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: { name, description, date: new Date(date), venue },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("PUT /events error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });

    await prisma.event.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /events error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
