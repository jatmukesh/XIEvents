import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        event: true,
        uploader: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error("GET /photos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { event_id, caption, uploaded_by, image_url } = await req.json();

    if (!event_id || !caption || !uploaded_by || !image_url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const photo = await prisma.photo.create({
      data: {
        event_id,
        caption,
        uploaded_by,
        image_url,
      },
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error("POST /photos error:", error);
    return NextResponse.json(
      { error: "Failed to create photo" },
      { status: 500 }
    );
  }
}
