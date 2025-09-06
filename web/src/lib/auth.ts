import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export { getServerSession as auth } from "next-auth/next";
export const getServerAuthSession = () => getServerSession(authOptions);