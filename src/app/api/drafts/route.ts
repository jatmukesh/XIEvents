import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const drafts = await prisma.draft.findMany({
      include: {
        created_by: true,
        mailLogs: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(drafts);
  } catch (error) {
    console.error("GET /drafts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch drafts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, body, created_by_id } = await req.json();

    if (!title || !body || !created_by_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const draft = await prisma.draft.create({
      data: {
        title,
        body,
        created_by_id,
      },
    });

    return NextResponse.json(draft, { status: 201 });
  } catch (error) {
    console.error("POST /drafts error:", error);
    return NextResponse.json(
      { error: "Failed to create draft" },
      { status: 500 }
    );
  }
}
