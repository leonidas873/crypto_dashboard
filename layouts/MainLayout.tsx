// components/MainLayout.tsx

import { ReactNode } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-900 text-white">
            <header className="bg-gray-800 py-4">
                <nav className="container mx-auto px-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/"
                                className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Crypto List
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/convert"
                                className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Convert
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="container mx-auto flex-grow px-4 py-8">
                {children}
            </main>
            <footer className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; Levan Khaburzania</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
