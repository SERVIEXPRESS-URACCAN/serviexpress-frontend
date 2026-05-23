import { SignInForm } from "@/components/sign-in";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold"><SignInForm/></h1>
    </div>
  )
}
