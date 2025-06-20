import React from 'react';

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <a href="/" className="flex items-center">
                        <img
                            src="https://www.k12.com/wp-content/themes/k12-theme-v2/assets/images/k12-logo.svg"
                            alt="K12 Logo"
                            className="h-8 md:h-10"
                        />
                    </a>
                    <div className="h-6 md:h-8 w-px bg-gray-300 mx-3 md:mx-4"></div>
                    <h1 className="text-lg md:text-xl font-semibold text-k12-dark-blue">
                        Vision Screening Test
                    </h1>
                </div>
                {/* Removed extra nav links */}
                <button className="md:hidden text-k12-dark-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
