import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/icons/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-2xl p-8 md:bg-card/50 md:shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="h-20 w-20 text-primary" />
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground">
            Welcome to TimeFlow
          </h1>
          <p className="text-center text-muted-foreground">
            Sign in to your account to track your time and manage tasks.
          </p>
        </div>
        <LoginForm />
      </div>
       <footer className="py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TimeFlow. All rights reserved.
      </footer>
    </div>
  );
}
