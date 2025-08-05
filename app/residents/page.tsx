
import Link from "next/link";

export default function ResidentsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome, Residents!</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Stay connected with your community, share feedback, and access important updates about your building and neighborhood.
        </p>
        <Link
          href="/residents/feedback/1"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4 shadow"
        >
          Give Feedback
        </Link>
        <div className="mt-6 text-gray-500 text-sm text-center">
          Looking for more? Explore building updates and community events soon!
        </div>
      </div>
    </main>
  );
}
