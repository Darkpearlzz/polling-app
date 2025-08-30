export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Polling App</h1>
      <p className="text-lg text-gray-700 mb-6">
        Create, vote, and explore polls easily!
      </p>
      <a
        href="/polls/1"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        View a Sample Poll
      </a>
    </main>
  );
}
