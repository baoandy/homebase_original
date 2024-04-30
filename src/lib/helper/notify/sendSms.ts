import { env } from "@/lib/env";
import Twilio from "twilio";
// import { prisma } from "@/lib/db/prisma";

/* //   usage:
await sendSMS({
  toPhoneNumber: 234567890,
  bodyText: "Text message goes here",
  sendAtDate: serviceQuote.arrivalDate,
});
 */
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const messageSid = env.TWILIO_SMS_SID;
const client = Twilio(accountSid, authToken);

interface SendSMSOptions {
  toPhoneNumber: string | null | undefined; // implement check if number is correct later
  bodyText: string;
  sendAtDate?: Date;
}

interface MessageResponse {
  sid: string;
  status: string; // Assuming status is a string, update to the correct type if needed
  body: string;
  to: string;
  dateCreated: Date;
}

async function sendSMS({
  toPhoneNumber,
  bodyText,
  sendAtDate,
}: SendSMSOptions): Promise<MessageResponse> {
  const scheduleType = sendAtDate ? "fixed" : undefined;

  // let fromPhone

  // recepient === "provider"

  // need to register to send from 10DLC phone number
  // if (recepient === "serviceUser") {
  //   fromPhone = userPhone
  // } else if (recepient === "provider") {
  //   fromPhone = proPhone
  // }

  return client.messages
    .create({
      messagingServiceSid: messageSid,
      scheduleType: scheduleType,
      sendAt: sendAtDate, // Ensure sendAt is an ISO string
      body: bodyText,
      to: "+1" + toPhoneNumber,
      // from: fromPhone,
    })
    .then(async (message) => {
      console.log(message.sid);
      const result = {
        sid: message.sid,
        status: message.status,
        body: message.body,
        to: message.to,
        dateCreated: message.dateCreated,
      };

      //  here can go the code to track SMS in the db

      return result; // Ensure this return is part of the returned promise chain
    })
    .catch((error) => {
      console.error(error);
      // Rethrow the error to be caught by the caller
      throw new Error("Failed to send SMS");
    });
}

export default sendSMS;
