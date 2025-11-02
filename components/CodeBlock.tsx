
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-slate-600/50 rounded-md text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <pre className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-b-lg overflow-x-auto text-sm">
        <code className="text-slate-800 dark:text-slate-200">{code}</code>
      </pre>
    </div>
  );
};
