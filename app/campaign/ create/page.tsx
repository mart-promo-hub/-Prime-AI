"use client";

import { usePi } from "@/components/providers/PiProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignPage() {
  const { ready } = usePi();
  const router = useRouter();
  const [isRestoring, setIsRestoring] = useState(false);
  const [pendingMessages, setPendingMessages] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [budget, setBudget] = useState("");

  const handleRestore = async () => {
    if (pendingMessages) {
      alert("Please wait for all messages to be processed");
      return;
    }
    
    setIsRestoring(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Version restored successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Restore failed:", error);
      alert("Failed to restore version. Please try again.");
    } finally {
      setIsRestoring(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Campaign "${campaignName}" created with budget ${budget} Pi`);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Campaign</h1>
        
        {/* نموذج إنشاء الحملة */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter budget in Pi"
                min="0.1"
                step="0.1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Create Campaign
            </button>
          </form>
        </div>

        {/* قسم الاستعادة */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <p className="text-yellow-700">
            ⚠️ All messages and versions after the restored version will be deleted.
          </p>
          {pendingMessages && (
            <p className="text-red-600 mt-2">
              ⚠️ Cannot restore while there are pending messages. Please wait for all messages to be processed.
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Previewing Version</h2>
          <div className="border rounded p-4 mb-6 bg-gray-50">
            <p className="text-gray-600">Campaign preview content will appear here...</p>
            <div className="mt-2 p-2 bg-white rounded border">
              <p className="text-sm text-gray-500">Version: v2.3.1</p>
              <p className="text-sm text-gray-500">Created: 2026-07-10</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleRestore}
              disabled={isRestoring || pendingMessages}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isRestoring ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Restoring...
                </>
              ) : (
                "Choose This Version"
              )}
            </button>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
