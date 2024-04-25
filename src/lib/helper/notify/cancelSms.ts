import { env } from "@/lib/env";
import Twilio from "twilio";

const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
// const messageSid = env.TWILIO_SMS_SID;
const client = Twilio(accountSid, authToken);

interface cancelSMSOptions {
  messageSid: string;
}

async function cancelSMS({ messageSid }: cancelSMSOptions): Promise<string> {
  return client
    .messages(messageSid)
    .update({status: 'canceled'})
    .then((message) => {
      console.log(message.sid);
      return message.sid; // Ensure this return is part of the returned promise chain
    })
    .catch((error) => {
      console.error(error);
      // Rethrow the error to be caught by the caller
      throw new Error("Failed to cancel SMS");
    });
}

export default cancelSMS;
