import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const draftId = Number(params.id);
    const draft = await prisma.draft.findUnique({
      where: { id: draftId },
      include: {
        created_by: true,
        mailLogs: true,
      },
    });

    if (!draft) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }

    return NextResponse.json(draft);
  } catch (error) {
    console.error("GET /drafts/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch draft" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const draftId = Number(params.id);
    const { title, body } = await req.json();

    const updated = await prisma.draft.update({
      where: { id: draftId },
      data: {
        title,
        body,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /drafts/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update draft" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const draftId = Number(params.id);

    await prisma.draft.delete({
      where: { id: draftId },
    });

    return NextResponse.json({ message: "Draft deleted" });
  } catch (error) {
    console.error("DELETE /drafts/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete draft" },
      { status: 500 }
    );
  }
}
