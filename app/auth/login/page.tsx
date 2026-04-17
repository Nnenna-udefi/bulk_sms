"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createClient } from "@/src/lib/supabaseClient";
// import { Button } from "@/src/ui/button";
// import { Input } from "@/src/ui/input";
import Link from "next/link";
// import { useToast } from "@/src/hooks/use-toast";

// const supabase = createClient();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    setLoading(false);

    // if (error) {
    //   setError(error.message);
    //   return;
    // }

    // clear fields
    setEmail("");
    setPassword("");

    // toast({
    //   title: "Login successful",
    //   description: "Redirecting to your dashboard...",
    // });

    router.push("/");
  }

  return (
    <div className="py-20 px-4 bg-[#fff6f3] text-[#0e1726]">
      <div className="bg-white shadow-md shadow-black container rounded-2xl max-w-125 mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Log In
          </h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******"
              required
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button
            disabled={loading}
            className="px-4 py-2 md:text-lg font-bold rounded-full bg-[#6495ED] text-white hover:bg-white hover:text-[#6495ED] w-fit"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#0e1726] hover:underline font-bold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
