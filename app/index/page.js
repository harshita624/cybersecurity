
import react from 'react';
export default function Home() {
  return (
    <div>
    
      <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to CyberSecure
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          Protect your personal and business information from cyber threats. We
          offer comprehensive cybersecurity solutions to keep your data safe.
        </p>
        <div className="mt-8">
          <img src="/images/cyber.gif" alt="Cybersecurity" className="w-full h-auto rounded-full" />
        </div>
      </main>
    </div>
  );
}
