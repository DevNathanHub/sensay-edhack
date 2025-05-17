import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Blue */}
      <div className="md:w-1/2 flex items-center justify-center bg-blue-600 text-white p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg">Log in or sign up to continue using our platform.</p>
        </div>
      </div>

      {/* Right - White */}
      <div className="md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Continue</h2>

          <Link href="/auth/login" passHref>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </Link>

          <Link href="/auth/signup" passHref>
            <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
