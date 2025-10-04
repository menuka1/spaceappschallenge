import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Orbit Lab Hub - Orbital Research as a Service</p>
        </div>
      </footer>
    </div>
  );
};