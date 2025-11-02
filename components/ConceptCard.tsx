
import React from 'react';
import type { Concept } from '../types';
import { CodeBlock } from './CodeBlock';

interface ConceptCardProps {
  concept: Concept;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">{concept.title}</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          <p>{concept.explanation}</p>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-900/50">
        <CodeBlock code={concept.codeExample} />
      </div>
    </div>
  );
};
