import RegisterForm from "../../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-6">
        <h1 className="text-xl mb-4">Create an account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
