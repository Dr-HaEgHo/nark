"use client";

import { useState } from "react";

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tracking_number: trackingNumber, carrier }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch tracking info");
      } else {
        setTrackingInfo(data.data.tracking);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full mx-auto p-6 lg:mt-[100px] flex flex-start gap-6">
          <div className="flex flex-[1] flex-col">
            <h1 className="text-2xl font-bold mb-4">📦 Track Your Order</h1>

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-3 flex flex-col items-start"
            >
              <input
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Tracking Number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                required
              />
              <input
                className="border border-gray-300 p-2 w-full rounded"
                placeholder="Carrier Slug (e.g. dhl, usps, fedex)"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                required
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-fit hover:bg-blue-700 text-center"
                type="submit"
              >
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>

            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>

          <div className="flex flex-[1]">
            {!trackingInfo && (
              <div className="w-full bg-gray-100 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Status: cjnfldf</h2>
                <p>Tracking Number: dflvdjfdfjndf</p>
                <p>Courier: Avid Logistics</p>
                <p>Last Checkpoint: Abeokuta</p>
                <div className="mt-4">
                  <h3 className="font-bold mb-1">Tracking History:</h3>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    <li className="border-l-4 border-blue-600 pl-2">
                      <p className="text-sm">
                        This is where the package has gotten to as at
                      </p>
                      <p className="text-xs text-gray-600">
                        location - 02:00pm
                      </p>
                    </li>
                    <li className="border-l-4 border-blue-600 pl-2">
                      <p className="text-sm">
                        This is where the package has gotten to as at
                      </p>
                      <p className="text-xs text-gray-600">
                        location - 02:00pm
                      </p>
                    </li>
                    <li className="border-l-4 border-blue-600 pl-2">
                      <p className="text-sm">
                        This is where the package has gotten to as at
                      </p>
                      <p className="text-xs text-gray-600">
                        location - 02:00pm
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* {trackingInfo && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">
            Status: {trackingInfo.tag.toUpperCase()}
          </h2>
          <p>Tracking Number: {trackingInfo.tracking_number}</p>
          <p>Courier: {trackingInfo.slug}</p>
          <p>Last Checkpoint: {trackingInfo.checkpoints?.at(-1)?.message || 'N/A'}</p>
          <div className="mt-4">
            <h3 className="font-bold mb-1">Tracking History:</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {trackingInfo.checkpoints?.reverse().map((cp: any, i: number) => (
                <li key={i} className="border-l-4 border-blue-600 pl-2">
                  <p className="text-sm">{cp.message}</p>
                  <p className="text-xs text-gray-600">
                    {cp.location || 'Unknown location'} – {cp.checkpoint_time}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )} */}
        </div>
      </div>
    </div>
  );
}
