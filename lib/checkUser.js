import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

// User session cache to reduce DB calls
const userCache = {};

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Check cache first
  if (userCache[user.id]) {
    return userCache[user.id];
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      // Cache the user for future requests
      userCache[user.id] = loggedInUser;
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    userCache[user.id] = newUser;
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

// Utility to invalidate cache for a specific user
export const invalidateUserCache = (clerkUserId) => {
  delete userCache[clerkUserId];
};
