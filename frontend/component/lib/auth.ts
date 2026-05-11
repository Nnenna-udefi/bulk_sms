import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => localStorage.getItem("token");

export const sendSMS = async (data: any) => {
  const res = await fetch(`${BASE_URL}/sms/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  if (!user || user === "undefined") return null;

  try {
    return JSON.parse(user);
  } catch (e) {
    localStorage.removeItem("user");
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api.getProfile();
      // Safe check for nested data
      const u = res?.user || res?.data || res;
      setUser(u);
      localStorage.setItem("user", JSON.stringify(u));
    } catch {
      logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return { user, loading, refreshProfile };
};
