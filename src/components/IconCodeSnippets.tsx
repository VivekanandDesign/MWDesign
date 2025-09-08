import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Tabs } from './ui/Tabs';
import { CodeSnippet } from './CodeSnippet';
import { Copy, Check, Download } from 'lucide-react';
import { useIconCustomization } from '../hooks/useIconCustomization';
import { useCopyHistory } from '../hooks/useCopyHistory';
import { generateCodeSnippets } from '../utils/iconCodeGenerator';

interface IconCodeSnippetsProps {
  iconName: string;
  className?: string;
}

export function IconCodeSnippets({ iconName, className = '' }: IconCodeSnippetsProps) {
  const [copiedState, setCopiedState] = useState<{[key: string]: boolean}>({});
  const { customization } = useIconCustomization();
  const { addToHistory } = useCopyHistory();

  const codeSnippets = generateCodeSnippets(iconName, {
    size: customization.size,
    color: customization.color,
    strokeWidth: customization.strokeWidth,
    fillColor: customization.fillColor
  });

  const handleCopy = async (type: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedState(prev => ({ ...prev, [type]: true }));
      
      // Add to history
      addToHistory(iconName, type as any, content);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedState(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const codeBlocks = [
    {
      id: 'svg',
      title: 'SVG',
      description: 'Raw SVG markup',
      content: codeSnippets.svg,
      language: 'xml',
      filename: `${iconName}.svg`
    },
    {
      id: 'jsx',
      title: 'React/JSX',
      description: 'React component',
      content: codeSnippets.jsx,
      language: 'jsx',
      filename: `${iconName}.jsx`
    },
    {
      id: 'html',
      title: 'HTML',
      description: 'HTML with inline styles',
      content: codeSnippets.html,
      language: 'html',
      filename: `${iconName}.html`
    },
    {
      id: 'css',
      title: 'CSS',
      description: 'CSS styles',
      content: codeSnippets.css,
      language: 'css',
      filename: `${iconName}.css`
    },
    {
      id: 'tailwind',
      title: 'Tailwind',
      description: 'Tailwind CSS classes',
      content: codeSnippets.tailwind,
      language: 'html',
      filename: `${iconName}-tailwind.html`
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Code Snippets
        </h3>
        <Badge variant="outline" className="text-xs">
          {codeBlocks.length} formats
        </Badge>
      </div>

      <div className="space-y-4">
        {codeBlocks.map((block) => (
          <div key={block.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {block.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {block.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleDownload(block.filename, block.content)}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                
                <Button
                  onClick={() => handleCopy(block.id, block.content)}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  disabled={copiedState[block.id]}
                >
                  {copiedState[block.id] ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-0 max-h-96 overflow-hidden">
              <CodeSnippet
                code={block.content}
                language={block.language}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
          Usage Instructions
        </h4>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>
            • <strong>SVG:</strong> Use directly in HTML or save as .svg file
          </p>
          <p>
            • <strong>React/JSX:</strong> Copy component into your React project
          </p>
          <p>
            • <strong>HTML/CSS:</strong> Traditional web development approach
          </p>
          <p>
            • <strong>Tailwind:</strong> Use with Tailwind CSS framework
          </p>
        </div>
      </div>

      {/* Customization Note */}
      <div className="text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <strong>Note:</strong> All code snippets are generated with your current customization settings:
        Size {customization.size}px, Stroke {customization.strokeWidth}px, Color {customization.color}
        {customization.fillColor && customization.fillColor !== 'none' && `, Fill ${customization.fillColor}`}
        {customization.className && `, Class "${customization.className}"`}.
      </div>
    </div>
  );
}
