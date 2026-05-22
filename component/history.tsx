"use client";

import { useEffect, useState } from "react";
import { Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { clearHistory, getHistory, HistoryEntry } from "./lib/smsHistory";
import { Badge } from "./ui/badge";

export default function History() {
  const [items, setItems] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const wipe = () => {
    if (confirm("Clear all local history?")) {
      clearHistory();
      setItems([]);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex gap-3">
          <div>
            <h1 className="font-sora text-3xl font-bold text-black">
              Message History
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={wipe}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="py-16 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Send className="h-5 w-5 font-dmSans text-gray-600" />
              </div>
              <h3 className="font-semibold">No messages yet</h3>
              <p className="text-sm font-dmSans text-gray-600 mt-1">
                Send your first campaign to see it here.
              </p>
              <button className="mt-4">
                <Link href="/send">Send your first SMS</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
              >
                <div className="pb-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "sent" ? "default" : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>

                      <h1 className="text-sm font-medium font-sora text-black">
                        {new Date(item.createdAt).toLocaleString()}
                      </h1>
                    </div>
                    <span className="text-xs text-gray-600">
                      {item.to.length} recipient
                      {item.to.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm whitespace-pre-wrap rounded-md bg-muted/50 p-3">
                    {item.message}
                  </p>
                  <details className="text-xs text-gray-600">
                    <summary className="cursor-pointer hover:text-foreground">
                      Recipients
                    </summary>
                    <div className="mt-2 font-mono break-all">
                      {item.to.join(", ")}
                    </div>
                  </details>
                  {item.error && (
                    <p className="text-xs text-destructive">
                      Error: {item.error}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
