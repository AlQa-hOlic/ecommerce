import nodemailer from "nodemailer";
import { Order } from "@prisma/client";

const orderConfirmation = async ({
  email,
  order,
  provider: { from, server } = {
    from: process.env.EMAIL_FROM || "NextAuth <no-reply@example.com>",
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
  },
}) => {
  const transport = nodemailer.createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Order #${order.id} confirmed`,
    text: text(order),
    html: html(order),
  });
};

function html(order: Order) {
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#5B9270";
  const buttonTextColor = "#ffffff";

  return `
  <body style="background: ${backgroundColor}; padding: 2rem;">
    <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor}">
                <strong style="color: ${buttonBackgroundColor};">${`Your order #${order.id} is successfully confirmed!`}</strong>
                <p>We will contact you when your order is ready</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 10px 0px 0px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

function text(order: Order) {
  return `Order #${order.id} is successfully confirmed!`;
}

export default orderConfirmation;
