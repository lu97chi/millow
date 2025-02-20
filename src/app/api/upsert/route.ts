// pages/api/upsert-properties.js

import { upsertPropertyEmbeddings } from "@/lib/agent/embeded";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await upsertPropertyEmbeddings();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error upserting property embeddings:", error);
    return NextResponse.json(
      { error: "Failed to upsert property embeddings" },
      { status: 500 }
    );
  }
}
