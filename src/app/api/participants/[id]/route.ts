import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single participant
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const participantId = Number(params.id);
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
      include: {
        event: true,
        class: true,
      },
    });

    if (!participant) {
      return NextResponse.json(
        { error: "Participant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(participant);
  } catch (error) {
    console.error("GET /participants/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch participant" },
      { status: 500 }
    );
  }
}

// update participant
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const participantId = Number(params.id);
    const { name, email, class_id } = await req.json();

    const updated = await prisma.participant.update({
      where: { id: participantId },
      data: {
        name,
        email,
        class_id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /participants/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update participant" },
      { status: 500 }
    );
  }
}

// remove participant
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const participantId = Number(params.id);

    await prisma.participant.delete({
      where: { id: participantId },
    });

    return NextResponse.json({ message: "Participant deleted" });
  } catch (error) {
    console.error("DELETE /participants/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete participant" },
      { status: 500 }
    );
  }
}
