import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const classId = Number(params.id);
    const classRecord = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        department: true,
        winners: true,
      },
    });

    if (!classRecord) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classRecord);
  } catch (error) {
    console.error("GET /classes/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch class" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const classId = Number(params.id);
    const { dept_id, year, section } = await req.json();

    const updated = await prisma.class.update({
      where: { id: classId },
      data: {
        dept_id,
        year,
        section,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /classes/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update class" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const classId = Number(params.id);

    await prisma.class.delete({
      where: { id: classId },
    });

    return NextResponse.json({ message: "Class deleted" });
  } catch (error) {
    console.error("DELETE /classes/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete class" },
      { status: 500 }
    );
  }
}
