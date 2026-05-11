"use client";

import { useEffect, useState } from "react";
import { Send, Users, MessageSquare, Loader2 } from "lucide-react";
import { addHistory } from "./lib/smsHistory";
import { useAuth } from "./context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type SmsResponse = {
  message: string;
  data: {
    code: string;
    message_id: string;
    message: string;
    balance: number;
    user: string;
  };
};

export default function Dashboard() {
  const router = useRouter();
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SmsResponse | null>(null);
  const [error, setError] = useState("");

  const recipientList = recipients
    .split(/[\n,]+/)
    .map((num) => num.trim())
    .filter(Boolean);

  const characterCount = message.length;

  const { user, logout } = useAuth();

  const handleSendSMS = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You are not authenticated.");
      }

      const res = await fetch(`${BASE_URL}/sms/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: recipientList,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send SMS");
      }

      setResponse(data);
      addHistory({
        id: crypto.randomUUID(),
        to: recipientList,
        message,
        status: "sent",
        response: data,
        createdAt: Date.now(),
      });
      setRecipients("");
      setMessage("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        addHistory({
          id: crypto.randomUUID(),
          to: recipientList,
          message,
          status: "failed",
          error: err instanceof Error ? err.message : "Unknown error",
          createdAt: Date.now(),
        });
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-sora text-3xl font-bold text-black">
              SMS Dashboard
            </h1>
            <p className="font-sora text-xl pt-3 font-bold text-black">
              Welcome, {user?.name}
            </p>

            <p className="mt-2 font-dmSans text-gray-600">
              Send bulk messages quickly and efficiently.
            </p>
          </div>
          <Link href="/dashboard/history">
            <button className="flex items-center cursor-pointer gap-2 rounded-xl bg-black px-5 py-3 font-dmSans text-sm font-medium text-white transition hover:opacity-90">
              <MessageSquare size={18} />
              Message History
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Users size={22} />
            </div>

            <h3 className="font-sora text-2xl font-bold">
              {recipientList.length}
            </h3>

            <p className="mt-1 font-dmSans text-sm text-gray-500">Recipients</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <MessageSquare size={22} />
            </div>

            <h3 className="font-sora text-2xl font-bold">{characterCount}</h3>

            <p className="mt-1 font-dmSans text-sm text-gray-500">Characters</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <Send size={22} />
            </div>

            <h3 className="font-sora text-2xl font-bold">
              {response?.data?.balance ?? "--"}
            </h3>

            <p className="mt-1 font-dmSans text-sm text-gray-500">
              SMS Balance
            </p>
          </div>
        </div>

        {/* SMS Form */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-bold text-black">
              Send Bulk SMS
            </h2>

            <p className="mt-2 font-dmSans text-gray-600">
              Enter phone numbers separated by commas or new lines.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recipients */}
            <div>
              <label className="mb-3 block font-dmSans text-sm font-medium text-black">
                Recipients
              </label>

              <textarea
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder={`08012345678,\n08098765432,\n+2348011122233`}
                className="h-72 w-full resize-none rounded-2xl border border-gray-300 bg-white p-4 font-dmSans text-sm outline-none transition focus:border-black"
              />

              <p className="mt-3 font-dmSans text-sm text-gray-500">
                Total recipients: {recipientList.length}
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="mb-3 block font-dmSans text-sm font-medium text-black">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your SMS message here..."
                className="h-72 w-full resize-none rounded-2xl border border-gray-300 bg-white p-4 font-dmSans text-sm outline-none transition focus:border-black"
              />

              <div className="mt-3 flex items-center justify-between">
                <p className="font-dmSans text-sm text-gray-500">
                  Characters: {characterCount}
                </p>

                <p className="font-dmSans text-sm text-gray-500">
                  Estimated SMS: {Math.ceil(characterCount / 160) || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="font-dmSans text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success */}
          {response && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
              <h3 className="font-sora text-lg font-semibold text-green-700">
                SMS Sent Successfully
              </h3>

              <div className="mt-3 space-y-2 font-dmSans text-sm text-green-700">
                <p>
                  <span className="font-semibold">Message ID:</span>{" "}
                  {response.data.message_id}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {response.data.message}
                </p>

                <p>
                  <span className="font-semibold">Balance:</span>{" "}
                  {response.data.balance}
                </p>

                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {response.data.user}
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSendSMS}
              disabled={
                loading || recipientList.length === 0 || !message.trim()
              }
              className="flex items-center gap-2 rounded-2xl bg-black px-6 py-4 font-dmSans text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send SMS
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
