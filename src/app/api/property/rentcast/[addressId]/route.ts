import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
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
    const url = formatAddress(property);
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
    if (data) {
      const propData = data[0];
      const savedProperty = await prisma.rentCastPropertyData.create({
        data: {
          addressId: propData.addressId,
          rentCastId: propData.id,
          formattedAddress: propData.formattedAddress,
          addressLine1: propData.addressLine1,
          addressLine2: propData.addressLine2,
          city: propData.city,
          state: propData.state,
          zipCode: propData.zipCode,
          county: propData.county,
          latitude: propData.latitude,
          longitude: propData.longitude,
          propertyType: propData.propertyType,
          bedrooms: propData.bedrooms,
          bathrooms: propData.bathrooms,
          squareFootage: propData.squareFootage,
          lotSize: propData.lotSize,
          yearBuilt: propData.yearBuilt,
          assessorId: propData.assessorId,
          legalDescription: propData.legalDescription,
          subdivision: propData.subdivision,
          zoning: propData.zoning,
          lastSaleDate: propData.lastSaleDate,
          lastSalePrice: propData.lastSalePrice,
          features: propData.features,
          taxAssessments: propData.taxAssessments,
          propertyTaxes: propData.propertyTaxes,
          owner: propData.owner,
          ownerOccupied: propData.ownerOccupied,
        },
      });
      return NextResponse.json({
        status: 200,
        message: "Property data saved",
        data: savedProperty,
      });
    }
    return NextResponse.json({
      status: 404,
      message: "Property not found",
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

function formatAddress(address: Address) {
  return `https://api.rentcast.io/v1/properties?address=${address.address1}%20${address.city}%2C%20${address.state}%2C%20${address.zipCode}`;
}
