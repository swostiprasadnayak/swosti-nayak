import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { rating, message } = await request.json();

        if (!rating) {
            return NextResponse.json({ error: "Rating is required" }, { status: 400 });
        }

        const ratingEmoji: Record<string, string> = {
            Bad: "😖",
            Decent: "😊",
            "Love it": "😍",
        };

        await resend.emails.send({
            from: "Portfolio Feedback <onboarding@resend.dev>",
            to: process.env.FEEDBACK_TO_EMAIL ?? "swostiprasadnayak15@gmail.com",
            subject: `Portfolio Feedback — ${ratingEmoji[rating] ?? ""} ${rating}`,
            html: `
                <div style="font-family: sans-serif; max-width: 480px; padding: 32px; background: #f6f6f6; border-radius: 12px;">
                    <h2 style="margin: 0 0 8px; color: #142333; font-size: 20px;">New Portfolio Feedback</h2>
                    <p style="margin: 0 0 24px; color: rgba(20,35,51,0.6); font-size: 13px;">Received from your portfolio site</p>
                    <div style="background: #ffffff; border-radius: 8px; padding: 20px 24px; margin-bottom: 16px;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: rgba(20,35,51,0.5); text-transform: uppercase; letter-spacing: 0.05em;">Rating</p>
                        <p style="margin: 0; font-size: 20px; font-weight: 600; color: #142333;">${ratingEmoji[rating] ?? ""} ${rating}</p>
                    </div>
                    ${message ? `
                    <div style="background: #ffffff; border-radius: 8px; padding: 20px 24px;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: rgba(20,35,51,0.5); text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #142333;">${message}</p>
                    </div>
                    ` : ""}
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Feedback email error:", error);
        return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 });
    }
}
