import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = Number(params.id);
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        fest: true,
        created_by: true,
        winners: true,
        photos: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("GET /events/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = Number(params.id);
    const body = await req.json();

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: {
        name: body.name,
        description: body.description,
        date: body.date ? new Date(body.date) : undefined,
        venue: body.venue,
        fest_id: body.fest_id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /events/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = Number(params.id);

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error("DELETE /events/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
