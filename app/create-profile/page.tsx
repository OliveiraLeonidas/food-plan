"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ApiResponse = {
  message?: string;
  error?: string;
};

async function CreateProfileRequest() {
  const response = await fetch("/api/create-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Falha ao criar perfil");
  }
  return data as ApiResponse;
}

export default function CreateProfile() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { mutate, isIdle } = useMutation<ApiResponse, Error>({
    mutationFn: CreateProfileRequest,
    onSuccess: (data) => {
      console.log(data);
      router.push("/subscribe");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && isIdle) {
      mutate();
    }
  }, [isLoaded, isIdle, isSignedIn, mutate]);
  return <div>Processing sign in ...</div>;
}
