const KEY = "sms_history";

export type HistoryEntry = {
  id: string;
  to: string[];
  message: string;
  status: "sent" | "failed";
  response?: any;
  error?: string;
  createdAt: number;
};

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addHistory(entry: HistoryEntry) {
  const list = getHistory();
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 200)));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
