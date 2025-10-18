import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const winners = await prisma.winner.findMany({
      include: {
        event: true,
        class: true,
      },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(winners);
  } catch (error) {
    console.error("GET /winners error:", error);
    return NextResponse.json(
      { error: "Failed to fetch winners" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { event_id, class_id, position } = await req.json();

    if (!event_id || !class_id || !position) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const winner = await prisma.winner.create({
      data: {
        event_id,
        class_id,
        position,
      },
    });

    return NextResponse.json(winner, { status: 201 });
  } catch (error) {
    console.error("POST /winners error:", error);
    return NextResponse.json(
      { error: "Failed to create winner" },
      { status: 500 }
    );
  }
}
