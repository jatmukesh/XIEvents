import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const fests = await prisma.fest.findMany({
      include: {
        created_by: true,
        events: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(fests);
  } catch (error) {
    console.error("GET /fests error:", error);
    return NextResponse.json(
      { error: "Failed to fetch fests" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, type, created_by_id } = await req.json();

    if (!name || !type || !created_by_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fest = await prisma.fest.create({
      data: {
        name,
        type,
        created_by_id,
      },
    });

    return NextResponse.json(fest, { status: 201 });
  } catch (error) {
    console.error("POST /fests error:", error);
    return NextResponse.json(
      { error: "Failed to create fest" },
      { status: 500 }
    );
  }
}
