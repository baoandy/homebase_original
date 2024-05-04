"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApproveApplicationProps {
  userId: string;
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function ApproveApplication({
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
    const accountResponse = await fetch(
      `/api/application/approve-application`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          secretKey: apiSecretKey,
        },
        body: JSON.stringify({
          cardApplicationId: cardApplicationId,
        }),
      },
    );
    const { status, message } = await accountResponse.json();
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
          "Approve Card Application"
        )}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
