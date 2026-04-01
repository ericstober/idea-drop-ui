import api from "@/lib/axios";

export const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });

    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to register";
    throw new Error(message);
  }
};
