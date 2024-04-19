import { NextResponse, NextRequest } from "next/server";
import { env } from "@/lib/env";

// this is universal api proxy for treasuryprime http requests

const apiKeyId = env.TREASURYPRIME_KEY_ID;
const apiKeyValue = env.TREASURYPRIME_KEY_SECRET;

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method, ": /api/proxy");
  try {
    const tp_url = (await req.headers.get("tp_url")) || "";
    const body = await req.json();

    const response = await fetch(tp_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${apiKeyId}:${apiKeyValue}`)}`,
      },
      body: JSON.stringify(body),
    });

    console.log(await response.json());
    // here need to add the code, or procedure call to make DB chnages

    return NextResponse.json({
      status: 200,
      message: "Proxy request successful",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.method, ": /api/proxy");
  try {
    const tp_url = (await req.headers.get("tp_url")) || "";
    const response = await fetch(tp_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${apiKeyId}:${apiKeyValue}`)}`,
      },
    })

    const data = await response.json();

    return NextResponse.json({
      status: 200,
      message: "Proxy request successful",
      data: data
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  } 
}
