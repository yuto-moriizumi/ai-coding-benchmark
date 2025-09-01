"use client";

import { useRouter } from "next/navigation";

export default function ResetButton() {
  const router = useRouter();

  const handleReset = async () => {
    try {
      const response = await fetch("/api/reset", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to reset data");
      }
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Reset data
    </button>
  );
}
