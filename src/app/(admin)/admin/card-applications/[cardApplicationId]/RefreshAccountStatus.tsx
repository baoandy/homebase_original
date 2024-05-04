"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface RefreshAccountStatusProps {
  userId: string;
  account_id: string;
  apiSecretKey: string;
}

export default function RefreshAccountStatus({
  userId,
  account_id,
  apiSecretKey,
}: RefreshAccountStatusProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleRefresh(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    const accountResponse = await fetch(
      `/api/tp/apply/account_application/${account_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          secretKey: apiSecretKey,
        },
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
      <button className="btn btn-primary" onClick={handleRefresh}>
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Refresh Account Status"
        )}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
