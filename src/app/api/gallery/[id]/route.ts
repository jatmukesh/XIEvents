import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const photoId = Number(params.id);
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      include: {
        event: true,
        uploader: true,
      },
    });

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    return NextResponse.json(photo);
  } catch (error) {
    console.error("GET /photos/:id error:", error);
    return NextResponse.json(
      { error: "Failed to fetch photo" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const photoId = Number(params.id);
    const { caption, image_url } = await req.json();

    const updated = await prisma.photo.update({
      where: { id: photoId },
      data: {
        caption,
        image_url,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /photos/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const photoId = Number(params.id);

    await prisma.photo.delete({
      where: { id: photoId },
    });

    return NextResponse.json({ message: "Photo deleted" });
  } catch (error) {
    console.error("DELETE /photos/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
