// pages/api/query-properties.js

import { queryProperties } from "@/lib/agent/embeded";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Missing query in request body" },
        { status: 400 }
      );
    }

    const results = await queryProperties(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error querying properties:", error);
    return NextResponse.json(
      { error: "Failed to query properties" },
      { status: 500 }
    );
  }
}