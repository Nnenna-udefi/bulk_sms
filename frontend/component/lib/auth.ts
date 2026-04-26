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
