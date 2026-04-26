const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const request = async (
  url: string,
  options: RequestInit = {},
  auth: boolean = false,
) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (auth) {
    const token = getToken();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const api = {
  // 🔐 AUTH

  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) =>
    request("/user/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request("/user/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: { email: string }) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (
    token: string,
    data: { password: string; confirmPassword: string },
  ) =>
    request(`/auth/reset-password/${token}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // 👤 USER

  updateProfile: (data: {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }) =>
    request(
      "/user/profile",
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true,
    ),

  getProfile: () =>
    request(
      "/user/profile",
      {
        method: "GET",
      },
      true,
    ),
};
