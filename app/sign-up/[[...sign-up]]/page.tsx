import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="flex justify-center items-center py-6">
      <SignUp signInFallbackRedirectUrl={"/subscribe"} />
    </div>
  );
}
