import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Login" },
    { name: "description", content: "Login to your ReWear account" },
  ];
}

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/images/logo-light.svg"
            alt="ReWear Logo"
            className="h-12 mb-2"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-center text-indigo-900">Login</h1>
        </div>
        <form className="space-y-4" method="post">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 pt-2">
          <span>Don't have an account? </span>
          <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">Register</a>
        </div>
      </div>
    </div>
  );
}
