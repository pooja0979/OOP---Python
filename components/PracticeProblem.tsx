import React, { useState } from 'react';
// Fix: Rename imported 'PracticeProblem' type to 'PracticeProblemType' to avoid naming conflict with the component.
import type { PracticeProblem as PracticeProblemType } from '../types';
import { CodeBlock } from './CodeBlock';
import { EyeIcon, EyeOffIcon } from './icons';

interface PracticeProblemProps {
  problem: PracticeProblemType;
}

export const PracticeProblem: React.FC<PracticeProblemProps> = ({ problem }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">{problem.title}</h3>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
           <p>{problem.problemStatement}</p>
        </div>

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          {showSolution ? <EyeOffIcon /> : <EyeIcon />}
          <span className="ml-2">{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
        </button>

        {showSolution && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Solution:</h4>
            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg overflow-hidden">
                <CodeBlock code={problem.solution} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
