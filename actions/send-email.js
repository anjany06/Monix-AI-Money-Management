import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  console.log("🚀 Starting email send process...");
  console.log("📧 Recipient:", to);
  console.log("📋 Subject:", subject);
  console.log("🔑 API Key exists:", !!process.env.RESEND_API_KEY);

  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "MoniX <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to], // Ensure it's an array
      subject,
      react,
    });

    console.log("✅ Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    console.error("Error details:", error.message);
    return { success: false, error: error.message };
  }
}
