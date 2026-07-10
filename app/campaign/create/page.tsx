"use client";

import { usePi } from "@/components/providers/PiProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignPage() {
  const { ready } = usePi();
  const router = useRouter();
  const [isRestoring, setIsRestoring] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [budget, setBudget] = useState("");

  const handleRestore = async () => {
    setIsRestoring(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("✅ Restored!");
    setIsRestoring(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✅ Campaign "${campaignName}" created with ${budget} Pi`);
    router.push("/dashboard");
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🚀 Create Campaign</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">📝 Campaign Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Budget (Pi)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter budget"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ✨ Create Campaign
            </button>
          </form>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <p className="text-yellow-700">⚠️ All messages after restore will be deleted.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🔄 Restore Version</h2>
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isRestoring ? "⏳ Restoring..." : "✅ Choose This Version"}
          </button>
        </div>
      </div>
    </div>
  );
}
