"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ActivateUserProps {
  userId: string;
  apiSecretKey: string;
}
export default function ActivateUser({
  userId,
  apiSecretKey,
}: ActivateUserProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState<string | null>(null);
  const [savingsStatus, setSavingsStatus] = useState<string | null>(null);
  async function handleActivate(e: React.MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    const response = await fetch(`/api/application/authorize-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const { status, message } = await response.json();
    if (status === 200) {
      router.refresh();
    }
    setLoading(false);
  }
  return (
    <button className="btn btn-primary" onClick={handleActivate}>
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        "Activate User"
      )}
    </button>
  );
}
