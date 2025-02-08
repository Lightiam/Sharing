import * as React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { PlatformConnection } from "./PlatformConnection";

// Custom TikTok icon since it's not in lucide-react
const TikTok: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom Threads icon
const Threads: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-6.88 17.26l5.27-5.27a3 3 0 1 1 4.24 4.24l-5.27 5.27A10 10 0 1 0 12 2z" />
  </svg>
);

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook className="w-6 h-6 text-purple-600" />,
    description: 'Connect your Facebook pages and groups'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <Twitter className="w-6 h-6 text-purple-600" />,
    description: 'Connect your Twitter account'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6 text-purple-600" />,
    description: 'Connect your Instagram business account'
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts',
    icon: <Youtube className="w-6 h-6 text-purple-600" />,
    description: 'Connect your YouTube channel'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <TikTok />,
    description: 'Connect your TikTok creator account'
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: <Threads />,
    description: 'Connect your Threads account'
  }
] as const;

export function PlatformConnectionList() {
  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <PlatformConnection
          key={platform.id}
          platform={platform.id}
          icon={platform.icon}
          name={platform.name}
          description={platform.description}
        />
      ))}
    </div>
  );
}
