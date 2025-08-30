import LoginForm from "../../../components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-6">
        <h1 className="text-xl mb-4">Sign in to Polling App</h1>
        <LoginForm />
      </div>
    </div>
  );
}
