import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "money-mng",
  name: "Money-Mng",
  //now we have to make one more thing if our func fails we have to make another attempt
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, //Exponential backoff
    maxAttempts: 2, //Max attempts
  }),
});
