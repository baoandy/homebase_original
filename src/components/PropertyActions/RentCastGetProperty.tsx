"use client";

import React, { useState } from "react";

interface RentCastGetPropertyProps {
  addressId: string;
  apiSecretKey: string;
}

export default function RentCastGetProperty({
  addressId,
  apiSecretKey,
}: RentCastGetPropertyProps) {
  const [loading, setLoading] = useState(false);
  async function handleCall() {
    setLoading(true);
    const response = await fetch(`/api/property/rentcast/${addressId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apiSecretKey: apiSecretKey,
      },
    });
    const data = await response.json();
    setLoading(false);
  }
  return (
    <button
      className="rounded-lg bg-primary px-4 py-2 text-white"
      onClick={handleCall}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        "Get Property"
      )}
    </button>
  );
}
