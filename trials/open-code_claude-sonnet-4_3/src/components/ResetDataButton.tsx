'use client';

import { useRouter } from 'next/navigation';

export function ResetDataButton() {
  const router = useRouter();

  const handleReset = async () => {
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to reset data:', error);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Reset data
    </button>
  );
}