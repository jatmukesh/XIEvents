import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const festId = Number(params.id);
    const fest = await prisma.fest.findUnique({
      where: { id: festId },
      include: {
        created_by: true,
        events: true,
      },
    });

    if (!fest) {
      return NextResponse.json({ error: "Fest not found" }, { status: 404 });
    }

    return NextResponse.json(fest);
  } catch (error) {
    console.error("GET /fests/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch fest" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const festId = Number(params.id);
    const { name, type, created_by_id } = await req.json();

    const updated = await prisma.fest.update({
      where: { id: festId },
      data: {
        name,
        type,
        created_by_id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /fests/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update fest" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const festId = Number(params.id);

    await prisma.fest.delete({
      where: { id: festId },
    });

    return NextResponse.json({ message: "Fest deleted" });
  } catch (error) {
    console.error("DELETE /fests/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete fest" },
      { status: 500 }
    );
  }
}
