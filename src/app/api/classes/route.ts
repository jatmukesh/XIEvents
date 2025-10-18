import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        department: true,
        winners: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error("GET /classes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { dept_id, year, section } = await req.json();

    if (!dept_id || !year || !section) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const classRecord = await prisma.class.create({
      data: {
        dept_id,
        year,
        section,
      },
    });

    return NextResponse.json(classRecord, { status: 201 });
  } catch (error) {
    console.error("POST /classes error:", error);
    return NextResponse.json(
      { error: "Failed to create class" },
      { status: 500 }
    );
  }
}
