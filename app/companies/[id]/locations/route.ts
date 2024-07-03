import { NextRequest, NextResponse } from "next/server";
import data from "@/data/api-data.json";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const locations = (data as any)[id].locations;
  return NextResponse.json(locations);
}
