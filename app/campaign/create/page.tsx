"use client";

import { usePi } from "@/components/providers/PiProvider";
import Link from "next/link";

export default function HomePage() {
  const { ready, error } = usePi();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Pi SDK</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading Pi SDK...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            πPrime AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Promotion Platform for Pi Ecosystem
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              View Dashboard
            </Link>
            <Link
              href="/campaign/create"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
            >
              Create Campaign
            </Link>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-sm text-gray-500">
              Balance: <span className="font-bold text-blue-600">0.75 Pi</span>
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>App Studio</p>
              <p>Experience an easier creation process</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
