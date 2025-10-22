"use client";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { isLoaded, user, isSignedIn } = useUser();

  if (!isLoaded) {
    return <header className="h-20 w-full bg-white"></header>;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-800 transition-transform hover:scale-105"
          >
            <Image
              src="/logo_food.svg"
              width={40}
              height={40}
              alt="Logo Food Meal Planner"
            />
            <span className="hidden sm:inline">
              <span className="text-emerald-600">Food</span>Planner
            </span>
          </Link>
        </div>

        {/* user actions and profile */}
        {/* TODO: Convert to component */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 sm:block"
            >
              Home
            </Link>
            <Link
              href="/sign-up"
              className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 sm:block"
            >
              Entrar
            </Link>
            <Link
              href={isSignedIn ? "/subscribe" : "/sign-up"}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Criar Conta
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              href="/foodplan"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
            >
              Meu Cardápio
            </Link>
            {user?.imageUrl && (
              <Link href="/profile">
                <Image
                  src={user.imageUrl}
                  alt="Foto de perfil do usuário"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-emerald-500/90 bg-gradient-to-b transition-transform hover:scale-105"
                />
              </Link>
            )}
            <SignOutButton>
              <button className="flex items-center gap-2 rounded-full p-2 text-sm text-slate-600 transition-colors hover:bg-slate-200/80 cursor-pointer">
                <LogOut className="h-4 w-4" />
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
