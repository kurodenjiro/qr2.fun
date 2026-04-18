"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegenRenePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/a/RegenRene");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-secondary font-label text-xs tracking-widest uppercase animate-pulse">
        REDIRECTING_TO_IDENTITY_DNA...
      </div>
    </div>
  );
}
