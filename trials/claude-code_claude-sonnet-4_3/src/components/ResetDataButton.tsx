'use client';

export default function ResetDataButton() {
  const handleReset = async () => {
    try {
      const response = await fetch('/api/reset', { method: 'POST' });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to reset data');
      }
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Reset data
    </button>
  );
}