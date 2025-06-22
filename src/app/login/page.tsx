import { Suspense } from "react";
import dynamic from "next/dynamic";

const LoginClient = dynamic(() => import("./LoginClient"), { ssr: false });

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
