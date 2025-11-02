
import React from 'react';
import { PythonLogo } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 shadow-md backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <PythonLogo />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
              Python OOP Tutor
            </h1>
          </div>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            For IB CS Students
          </span>
        </div>
      </div>
    </header>
  );
};
