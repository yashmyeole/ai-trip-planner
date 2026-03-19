import DemoCredentials from "@/app/_components/DemoCredentials";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <SignIn />
      <div className="mt-8 w-full max-w-md">
        <DemoCredentials />
      </div>
    </div>
  );
}
