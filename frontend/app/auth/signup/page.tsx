"use client";
import { useToast } from "@/component/hook/useToast";
import { api } from "@/component/lib/api";
// import { createClient } from "@/src/lib/supabaseClient";

import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import PasswordChecklist from "react-password-checklist";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const auth = [
    { name: "name", type: "text", label: "Full Name", placeholder: "John Doe" },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@mail.com",
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "09035656545",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "*******",
    },
    {
      name: "passwordAgain",
      type: "password",
      label: "Confirm Password",
      placeholder: "*******",
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const { name, email, phone, password, passwordAgain } = form;

    // validation first
    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return;
    }

    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasCapital = /[A-Z]/.test(password);

    if (!minLength || !hasNumber || !hasSpecial || !hasCapital) {
      setError("Password does not meet the required criteria.");
      return;
    }

    setLoading(true);

    // API call only after validation
    const { error } = await api.register({
      name,
      email,
      phone,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      toast({
        variant: "default",
        title: "Account creation failed",
        description: error.message || "Invalid email or password.",
      });
      return;
    }

    // success flow
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordAgain: "",
    });

    if (!error) {
      toast({
        title: "Registration successful",
        description: "Redirecting to your dashboard...",
      });
      router.push(`/auth/login?registered=true`);
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="py-20 px-6 bg-[#fff6f3] text-[#0e1726]">
      <div className="bg-white shadow-md shadow-black container rounded-2xl max-w-125 mx-auto px-4 md:px-6 py-8 lg:px-8  h-full flex flex-col gap-4">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Create an Account
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
          {error && (
            <div className="flex gap-3">
              <MessageCircleWarning className="text-danger" />{" "}
              <p className="text-danger md:text-xl">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {auth.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label htmlFor={field.name} className="font-medium">
                  {field.label}
                </label>

                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof typeof form]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="border placeholder:text-sm rounded-md p-2 text-[#0e1726] bg-none border-[#0e1726]"
                />
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <p>
              ** Password must contain at least 8 characters, a special
              character, a number and a capital letter.
            </p>
          </div>

          {/* <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={form.password}
            valueAgain={form.passwordAgain}
            messages={{
              minLength: "Password must be at least 8 characters long.",
              specialChar: "Password must contain a special character.",
              number: "Password must contain a number.",
              capital: "Password must contain a capital letter.",
              match: "Passwords must match.",
            }}
          /> */}

          <button
            disabled={loading}
            className="px-4 py-2  md:text-lg font-bold rounded-full hover:border bg-[#0e1726] hover:border-[#0e1726] text-white hover:bg-white hover:text-[#0e1726] w-full"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#0e1726] hover:underline font-bold"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
