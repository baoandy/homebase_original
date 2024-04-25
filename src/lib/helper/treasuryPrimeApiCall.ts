import { env } from "@/lib/env";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

// this is universal function that makes api call for treasuryprime http requests
// as input params excepts
// req_type - [GET, POST], url = "treasuryprime url without base url"
// body - "Optional body of a request, sent to tp as is"

const tpBaseUrl = env.TREASURYPRIME_API_BASE_URL;
const apiKeyId = env.TREASURYPRIME_KEY_ID;
const apiKeyValue = env.TREASURYPRIME_KEY_SECRET;

interface TreasuryPrimeApiCallOptions {
  req_type: string;
  url: string;
  body?: Object;
  userId?: string;
}

async function treasuryPrimeApiCall(options: TreasuryPrimeApiCallOptions) {
  const { req_type, url, body, userId } = options;

  const tp_url = tpBaseUrl + url;
  const tp_auth = `Basic ${btoa(`${apiKeyId}:${apiKeyValue}`)}`;
  // POST ------------------------------------------------------------------------

  if (req_type == "GET") {
    const response = await fetch(tp_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tp_auth,
      },
    });

    const data = await response.json();

    await prisma.tp_communications.create({
      data: {
        userId: userId,
        method: req_type,
        url: tp_url,
        request: body as Prisma.InputJsonValue,
        res_status: response.status,
        responce: data,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Request successful",
      data: data,
    });
    // POST ------------------------------------------------------------------------
  } else if (req_type == "POST") {
    const response = await fetch(tp_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tp_auth,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    await prisma.tp_communications.create({
      data: {
        userId: userId,
        method: req_type,
        url: tp_url,
        request: body as Prisma.InputJsonValue,
        res_status: response.status,
        responce: data,
      },
    });

    return NextResponse.json({
      data,
    });
  }
}

export default treasuryPrimeApiCall;
