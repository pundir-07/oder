import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    await client.messages.create({
      from: "+19895026416",
      body: `Your OTP is: ${otp}`,
      to: phone,
    });

    return NextResponse.json({ success: true, otp }); // In real apps, don't return OTP in response
  } catch (error) {
    console.error("Twilio Error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
