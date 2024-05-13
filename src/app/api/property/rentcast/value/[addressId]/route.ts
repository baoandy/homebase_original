import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { RentCastPropertyData } from "@prisma/client";
import { Address } from "@prisma/client";
import { env } from "@/lib/env";

export async function GET(
  req: NextRequest,
  { params }: { params: { addressId: string } },
) {
  try {
    const secretKey = req.headers.get("apiSecretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized",
      });
    }
    const addressId = params.addressId;
    const property = await prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });
    if (!property) {
      return NextResponse.json({
        status: 404,
        message: "Property not found",
      });
    }
    const rentCastProperty = await prisma.rentCastPropertyData.findFirst({
      where: {
        addressId: property.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!rentCastProperty) {
      return NextResponse.json({
        status: 403,
        message: "No Prior rentcast data",
      });
    }
    const url = formatAddress(property, rentCastProperty);
    //   "https://api.rentcast.io/v1/properties?address=5500%20Grand%20Lake%20Dr%2C%20San%20Antonio%2C%20TX%2C%2078244";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Api-Key": env.RENTCAST_API_KEY,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!data) {
      return NextResponse.json({ status: 404, message: "Property Not found" });
    }
    const propertyValue = await prisma.rentCastPropertyValue.create({
      data: {
        addressId: property.id,
        price: data.price,
        priceRangeLow: data.priceRangeLow,
        priceRangeHigh: data.priceRangeHigh,
        latitude: data.latitude,
        longitude: data.longitude,
        comparables: data.comparables,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Property Value Fetched",
      data: propertyValue,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

function formatAddress(
  address: Address,
  rentCastProperty: RentCastPropertyData,
) {
  return `https://api.rentcast.io/v1/avm/value?address=${address.address1}%20${address.city}%2C%20${address.state}%2C%20${address.zipCode}&propertyType=${rentCastProperty.propertyType.replace(" ", "%20")}&bedrooms=${rentCastProperty.bedrooms}&bathrooms=${rentCastProperty.bathrooms}&squareFootage=${rentCastProperty.squareFootage}`;
}
