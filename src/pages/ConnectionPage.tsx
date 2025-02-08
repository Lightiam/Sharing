import * as React from 'react';
import { PlatformConnectionList } from '../components/PlatformConnectionList';

export default function ConnectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Connect Your Social Media Accounts
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Connect your social media accounts to start managing and scheduling your content across all platforms.
        </p>
        <PlatformConnectionList />
      </div>
    </div>
  );
}
