import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], //To limit the api call we used to track the user based on Clerk user ID
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 3600,
      capacity: 10,
      //so every hour user can make 10 request and then every hour it will refill with 10
    }),
  ],
});

export default aj;
