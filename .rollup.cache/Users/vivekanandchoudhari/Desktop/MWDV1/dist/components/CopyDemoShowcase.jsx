import React from 'react';
import { Heart, Download, Code, FileText } from 'lucide-react';
import { CopyIconButton, SimpleCopyButton } from '@/components/CopyIconButton';
import { CopyType } from '@/utils/svgExtractor';
export const CopyDemoShowcase = () => {
    return (<div className="p-6 space-y-8 bg-white dark:bg-mw-gray-800 rounded-lg border border-mw-gray-200 dark:border-mw-gray-700">
      <div>
        <h3 className="text-lg font-semibold text-mw-gray-900 dark:text-white mb-4">
          Copy SVG Functionality Demo
        </h3>
        <p className="text-sm text-mw-gray-600 dark:text-mw-gray-400 mb-6">
          Test the new enhanced copy functionality with multiple format options.
        </p>
      </div>

      <div className="space-y-6">
        {/* Full Featured Copy Button */}
        <div>
          <h4 className="text-md font-medium text-mw-gray-900 dark:text-white mb-3">
            Split Button with Dropdown
          </h4>
          <div className="flex items-center gap-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg">
            <Heart className="w-6 h-6 text-red-500"/>
            <span className="font-mono text-sm">Heart</span>
            <CopyIconButton iconName="Heart" variant="primary" size="md" showDropdown={true} iconSize={24}/>
          </div>
        </div>

        {/* Simple Copy Button */}
        <div>
          <h4 className="text-md font-medium text-mw-gray-900 dark:text-white mb-3">
            Simple Copy Button (Grid View Style)
          </h4>
          <div className="flex items-center gap-4 p-4 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg">
            <Download className="w-6 h-6 text-blue-500"/>
            <span className="font-mono text-sm">Download</span>
            <CopyIconButton iconName="Download" variant="primary" size="sm" showDropdown={false} iconSize={24}/>
          </div>
        </div>

        {/* Mini Copy Buttons */}
        <div>
          <h4 className="text-md font-medium text-mw-gray-900 dark:text-white mb-3">
            Simple Copy Buttons (Different Types)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg">
              <Code className="w-5 h-5 text-green-500"/>
              <span className="font-mono text-xs">Code</span>
              <SimpleCopyButton iconName="Code" copyType={CopyType.SVG} size={20}/>
            </div>
            <div className="flex items-center gap-3 p-3 bg-mw-gray-50 dark:bg-mw-gray-700 rounded-lg">
              <FileText className="w-5 h-5 text-purple-500"/>
              <span className="font-mono text-xs">FileText</span>
              <SimpleCopyButton iconName="FileText" copyType={CopyType.JSX} size={20}/>
            </div>
          </div>
        </div>

        {/* Copy Format Examples */}
        <div>
          <h4 className="text-md font-medium text-mw-gray-900 dark:text-white mb-3">
            Copy Format Examples
          </h4>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-mw-gray-50 dark:bg-mw-gray-700 rounded font-mono">
              <div className="text-mw-gray-600 dark:text-mw-gray-400 mb-1">SVG Format:</div>
              <code>{`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">`}</code>
            </div>
            <div className="p-3 bg-mw-gray-50 dark:bg-mw-gray-700 rounded font-mono">
              <div className="text-mw-gray-600 dark:text-mw-gray-400 mb-1">Import Format:</div>
              <code>{`import { Heart } from 'lucide-react'`}</code>
            </div>
            <div className="p-3 bg-mw-gray-50 dark:bg-mw-gray-700 rounded font-mono">
              <div className="text-mw-gray-600 dark:text-mw-gray-400 mb-1">JSX Format:</div>
              <code>{`const HeartIcon = () => ( <svg className="icon icon-heart">...</svg> )`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
//# sourceMappingURL=CopyDemoShowcase.jsx.map