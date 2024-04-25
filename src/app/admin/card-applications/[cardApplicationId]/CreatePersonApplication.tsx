"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApproveApplicationProps {
  userId: string;
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function CreatePersonApplication({
  userId,
  cardApplicationId,
  apiSecretKey,
}: ApproveApplicationProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleApproval(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const personResponse = await fetch(`/api/tp/apply/person_application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify({
        userId: userId,
        cardApplicationId: cardApplicationId,
      }),
    });
    const { status, message } = await personResponse.json();
    console.log(status, message);
    if (status === 200) {
      router.refresh();
    }

    setLoading(false);
  }
  return (
    <>
      <button className="btn btn-primary" onClick={handleApproval}>
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Create Person Application"
        )}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
