import { NextRequest, NextResponse } from "next/server";
import { createPoll, PollData } from "@/lib/pollService";
import { getAuth } from "firebase/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: PollData = await req.json();
    const newPoll = await createPoll(data, user.uid);

    return NextResponse.json(newPoll, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create poll." },
      { status: 500 }
    );
  }
}
