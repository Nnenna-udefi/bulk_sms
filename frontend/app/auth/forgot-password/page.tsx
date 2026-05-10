"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/component/lib/api";
import { useToast } from "@/component/hook/useToast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleForgetPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.forgotPassword({ email });

      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
      setEmail("");
    } catch (err: any) {
      console.error(err);

      setError(err?.message || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="py-20 px-6 bg-[#fff6f3] text-[#0e1726]">
      <div className="bg-white shadow-md shadow-black container rounded-2xl max-w-125 mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Forget Password
          </h1>
          <p className="text-gray-600 text-sm p-2">
            We will send you a reset link
          </p>
        </div>
        <form
          onSubmit={handleForgetPassword}
          className="flex flex-col gap-4 md:gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@gmail.com"
              required
              className="border rounded-md p-2 placeholder:text-sm text-[#0e1726] bg-none border-[#0e1726]"
            />
          </div>

          <button
            disabled={loading}
            className="px-4 py-2 md:text-lg font-bold rounded-full hover:border bg-[#0e1726] hover:border-[#0e1726] text-white hover:bg-white hover:text-[#0e1726] w-full"
          >
            {loading ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Remembered?{" "}
          <Link
            href="/auth/login"
            className="text-[#0e1726] hover:underline font-bold"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
