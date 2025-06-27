
import type { ReactNode } from 'react';
import Navbar from '../pages/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow">{children}</div>
      </main>
    </div>
  );
}
