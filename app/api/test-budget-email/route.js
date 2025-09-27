import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

export async function GET() {
  try {
    console.log("🧪 Testing budget email...");
    
    const result = await sendEmail({
      to: "subhaminfo1111x@gmail.com", // Replace with your actual email
      subject: "Test Budget Alert from MoniX",
      react: EmailTemplate({
        userName: "Test User",
        type: "budget-alert",
        data: {
          percentageUsed: 85.5,
          budgetAmount: "1000",
          totalExpenses: "855",
          accountName: "Main Account",
        },
      }),
    });

    return Response.json({ 
      success: result.success, 
      data: result.data,
      error: result.error 
    });
  } catch (error) {
    console.error("Test email error:", error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}