"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // relative import to avoid alias issues
import Input from "./input";
import Button from "./button";

export default function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    if (!email || !password) return "Email and password are required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setError(error.message ?? "Login failed");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <Input
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
