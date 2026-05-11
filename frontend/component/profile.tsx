"use client";
import React, { useEffect, useState } from "react";
import { auth } from "./hook/constant";
import { Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "./hook/useToast";
import { api } from "./lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/authContext";

const Profile = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { logout, refreshProfile } = useAuth();

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, password, passwordAgain } = form;
    if (password && password !== passwordAgain)
      return toast({
        variant: "danger",
        title: "Password match failed.",
        description: error || "Password do not match.",
      });
    setSaving(true);
    try {
      const body: any = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };
      if (password) {
        body.password = password;
        body.confirmPassword = passwordAgain;
      }
      await api.updateProfile(body);
      toast({
        variant: "default",
        title: "Profile updated successfully.",
      });
      setForm((prev) => ({
        ...prev,
        password: "",
        passwordAgain: "",
      }));

      await refreshProfile();
    } catch (err: any) {
      toast({
        variant: "danger",
        title: "Update failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (
      !window.confirm(
        "This will permanently delete your account. Are you sure?",
      )
    )
      return;
    setDeleting(true);
    try {
      await api.deleteProfile();
      toast({
        variant: "default",
        title: "Account deleted",
      });
      logout();
      router.push(`/`);
    } catch (err: any) {
      toast({
        variant: "danger",
        title: "Delete failed.",
        description: err.message || "Couldn't delete, try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 md:px-16 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex gap-3">
          <div>
            <h1 className="font-sora text-3xl font-bold text-black">Profile</h1>

            <p className="mt-2 font-dmSans text-gray-600">
              Manage your account details
            </p>
          </div>
        </div>
      </div>

      {/* SMS Form */}
      <div className=" flex flex-col max-w-[80%] justify-center">
        <div className="rounded-3xl border  border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-bold text-black">
              Account information
            </h2>

            <p className="mt-2 font-dmSans text-gray-600">
              Update your personal details and password.
            </p>
          </div>

          <form onSubmit={onSave} className="">
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
                    className="border text-sm outline-none transition focus:border-black placeholder:text-sm placeholder:text-gray-600 rounded-md p-2 font-dmSans text-[#0e1726] bg-none border-[#0e1726]"
                  />
                </div>
              ))}
            </div>

            {/* Error
          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="font-dmSans text-sm text-red-600">{error}</p>
            </div>
          )} */}

            {/* Submit */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 cursor-pointer rounded-2xl bg-black px-6 py-4 font-dmSans text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Saving..
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        {/* Delete */}
        <div className="rounded-3xl border my-10 border-red-800/30 bg-red-100 p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="font-sora text-2xl font-bold text-red-800">
              Danger zone
            </h2>

            <p className="mt-2 font-dmSans text-gray-600">
              Permanently delete your account and all associated data.
            </p>
          </div>

          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-2xl cursor-pointer bg-red-800 px-6 py-4 font-dmSans text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Deleting..
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete account
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
