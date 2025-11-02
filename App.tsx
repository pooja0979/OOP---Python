
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ConceptCard } from './components/ConceptCard';
import { Quiz } from './components/Quiz';
import { PracticeProblem } from './components/PracticeProblem';
import { LoadingSpinner, ErrorIcon } from './components/icons';
import { fetchOopContent } from './services/geminiService';
import type { EducationalContent, View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('concepts');
  const [content, setContent] = useState<EducationalContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedContent = await fetchOopContent();
      setContent(fetchedContent);
    } catch (err) {
      setError('Failed to load educational content. Please check your API key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <LoadingSpinner />
          <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-400">
            Generating your Python OOP lesson...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <ErrorIcon />
          <p className="mt-4 text-lg font-semibold text-red-700 dark:text-red-300">
            An Error Occurred
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{error}</p>
          <button
            onClick={loadContent}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!content) {
      return null;
    }

    switch (view) {
      case 'concepts':
        return (
          <div className="space-y-6">
            {content.concepts.map((concept, index) => (
              <ConceptCard key={index} concept={concept} />
            ))}
          </div>
        );
      case 'quiz':
        return <Quiz questions={content.quiz} />;
      case 'practice':
        return (
          <div className="space-y-6">
            {content.practiceProblems.map((problem, index) => (
              <PracticeProblem key={index} problem={problem} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  
  const NavButton: React.FC<{
    targetView: View;
    children: React.ReactNode;
  }> = ({ targetView, children }) => (
    <button
      onClick={() => setView(targetView)}
      className={`px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-200 ${
        view === targetView
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-8 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg flex justify-center space-x-1 sm:space-x-2">
          <NavButton targetView="concepts">Core Concepts</NavButton>
          <NavButton targetView="quiz">Quiz Time</NavButton>
          <NavButton targetView="practice">Practice Problems</NavButton>
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
