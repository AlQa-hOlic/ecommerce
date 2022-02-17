import prisma from "../../prisma/client";

export const login = async ({ email }) => {
  // console.log("Email: ", email);
  let user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      verificationRequest: true,
    },
  });

  if (!user || (!user.verificationRequest && !user.verified)) {
    user = await prisma.user.upsert({
      where: {
        email,
      },
      create: {
        email,
        verified: false,
        verificationRequest: {
          create: {},
        },
      },
      update: {
        verificationRequest: {
          create: {},
        },
      },
      include: {
        verificationRequest: true,
      },
    });
    return {
      status: true,
      message: "Check your email to verify this account.",
    };
  }

  if (!user.verified) {
    return {
      status: false,
      message: "Please verify your email.",
    };
  }

  return {
    status: true,
    message: "Login Successfull.",
    token: "adcbefgh",
  };
};
