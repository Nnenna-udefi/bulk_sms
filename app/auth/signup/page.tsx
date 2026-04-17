"use client";
// import { toast } from "@/src/hooks/use-toast";
// import { createClient } from "@/src/lib/supabaseClient";

import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";

// const supabase = createClient();

const Signup = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    //     const { error } = await supabase.auth.signUp({
    //       email,
    //       password,
    //       options: {
    //         data: {
    //           full_name: name, // saves to user metadata on supabase
    //         },
    //         emailRedirectTo: `${window.location.origin}/login`,
    //       },
    //     });
    //     setLoading(false);
    //     if (error) {
    //       setError(error.message);
    //       return;
    //     }

    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }

    // Regex checks for password criteria
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasCapital = /[A-Z]/.test(password);

    if (!minLength || !hasNumber || !hasSpecial || !hasCapital) {
      setError("Password does not meet the required criteria.");
      return;
    }
    if (!error) {
      setFirstName("");
      setEmail("");
      setPassword("");
      //   toast({
      //     title: "Account created!",
      //     description: "Check your email to confirm your account.",
      //   });
    }
    router.push(`/signUp/emailSent?email=${encodeURIComponent(email)}`);
  }
  return (
    <div className="py-20 px-4 bg-[#fff6f3] text-[#0e1726]">
      <div className="bg-white container rounded-2xl max-w-125 mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create an Account
          </h1>
          {/* <p className="pt-3 text-foreground/70">
            Get started with your personal AI lab assistant
          </p> */}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
          {error && (
            <div className="flex gap-3">
              <MessageCircleWarning className="text-danger" />{" "}
              <p className="text-danger md:text-xl">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <input
              //   value={firstName}
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
              type="text"
              placeholder="Full name"
              //   onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              //   value={email}
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
              type="email"
              placeholder="Email Address"
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="password">Password</label>
            <input
              //   value={password}
              type="password"
              placeholder="*******"
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
              //   onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Enter Password Again</label>
            <input
              //   value={passwordAgain}
              className="border rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
              type="password"
              placeholder="*******"
              //   onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            messages={{
              minLength: "Password must be at least 8 characters long.",
              specialChar: "Password must contain a special character.",
              number: "Password must contain a number.",
              capital: "Password must contain a capital letter.",
              match: "Passwords must match.",
            }}
          />

          <button
            disabled={loading}
            className="px-4 md:px-6 py-2 md:py-4 md:text-lg font-bold rounded-full bg-[#6495ED] text-white hover:bg-white hover:text-[#6495ED] w-fit"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#0e1726] hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
