import { NextRequest, NextResponse } from "next/server";
import data from "@/data/api-data.json";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const assets = (data as any)[id].assets;
  return NextResponse.json(assets);
}
