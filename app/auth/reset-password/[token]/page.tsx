"use client";

import { api } from "@/component/lib/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.resetPassword(token, {
        password,
        confirmPassword,
      });

      router.push("/auth/login");
    } catch (err: any) {
      setError(err?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fff6f3] px-6 py-20 text-[#0e1726]">
      <div className="container mx-auto flex max-w-125 flex-col gap-4 rounded-2xl bg-white px-6 py-10 shadow-md shadow-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>

          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>

        <form
          onSubmit={handleResetPassword}
          className="mt-6 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium">New Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md border border-[#0e1726] p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="rounded-md border border-[#0e1726] p-3"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-full bg-[#0e1726] px-4 py-3 font-bold text-white transition hover:bg-black disabled:opacity-50"
          >
            {loading ? "Resetting password..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Back to{" "}
          <Link href="/auth/login" className="font-bold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
