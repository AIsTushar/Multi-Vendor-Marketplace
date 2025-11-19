import { prisma } from "../../../utils/prisma";
import { transporter, ADMIN_EMAIL, COMPANY_NAME } from "./config";
import { generateAccountLinkEmail, otpEmailTemplate } from "./emailTemplates";

export const sendEmailFn = async (email: string, otp: number) => {
  const findUser = await prisma.user.findUnique({
    where: { email },
  });

  const userName = findUser?.name || "User";

  const htmlContent = otpEmailTemplate(userName, otp, COMPANY_NAME);

  const mailOptions = {
    from: `"no-reply" <${ADMIN_EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
};
