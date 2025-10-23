import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {

// When user signs up, give them a notification like a toast to tell them to verify their email

  return (
    <form className="flex flex-col">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <Button formAction={login}>Log In</Button>
      <Button formAction={signup}>Sign Up</Button>
    </form>
  );
}
