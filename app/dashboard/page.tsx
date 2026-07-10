"use client";

import { usePi } from "@/components/providers/PiProvider";
import Link from "next/link";

export default function DashboardPage() {
  const { ready } = usePi();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard</h1>
          <Link
            href="/campaign/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + New Campaign
          </Link>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">📋 Total Campaigns</p>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">✅ Active Campaigns</p>
            <p className="text-2xl font-bold mt-2 text-green-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">💰 Total Spent</p>
            <p className="text-2xl font-bold mt-2 text-blue-600">0.75 Pi</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">👁️ Impressions</p>
            <p className="text-2xl font-bold mt-2">15,240</p>
          </div>
        </div>

        {/* النشاط الأخير */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🕒 Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>🚀 Campaign "Summer Sale" launched</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>💰 Budget updated for "Winter Promo"</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>✨ New campaign "Spring Festival" created</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
