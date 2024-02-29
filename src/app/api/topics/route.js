import connectMongoDB from '../../../../libs/mongodb';
import Topic from '../../../../models/topic';
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, description, src } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description, src });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  }

  export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  }