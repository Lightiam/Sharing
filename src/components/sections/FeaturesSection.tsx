import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// Custom TikTok icon since it's not in lucide-react
const TikTok = () => (
  <svg className="ud-w-8 ud-h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom Threads icon
const Threads = () => (
  <svg className="ud-w-8 ud-h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-6.88 17.26l5.27-5.27a3 3 0 1 1 4.24 4.24l-5.27 5.27A10 10 0 1 0 12 2z" />
  </svg>
);

interface Feature {
  title: string;
  description: string;
  icons: React.ReactNode[];
}

const features: Feature[] = [
  {
    title: "Facebook & Instagram",
    description: "Schedule posts, stories, and reels. Manage multiple pages and accounts with ease.",
    icons: [<Facebook key="fb" className="ud-w-8 ud-h-8" />, <Instagram key="ig" className="ud-w-8 ud-h-8" />]
  },
  {
    title: "Twitter & Threads",
    description: "Create engaging tweets and threads. Schedule your content for maximum engagement.",
    icons: [<Twitter className="ud-w-8 ud-h-8" />, <Threads />]
  },
  {
    title: "YouTube Shorts & TikTok",
    description: "Upload and schedule shorts and videos. Optimize your content for each platform.",
    icons: [<Youtube className="ud-w-8 ud-h-8" />, <TikTok />]
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="ud-pt-[100px]">
      <div className="ud-container">
        <div className="ud-flex ud-justify-center ud--mx-4">
          <div className="ud-w-full ud-px-4">
            <div className="ud-max-w-[570px] ud-mx-auto ud-text-center ud-mb-[100px]">
              <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                Powerful Social Media Management
              </h2>
              <p className="ud-text-base ud-text-body-color">
                Connect and manage all your social media accounts in one place. Schedule posts, analyze performance, and grow your audience.
              </p>
            </div>
          </div>
        </div>

        <div className="ud-flex ud-flex-wrap ud--mx-4">
          {features.map((feature, index) => (
            <div key={index} className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-p-10 ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-features hover:ud-shadow-features-hover ud-transition-all ud-mb-8">
                <div className="ud-flex ud-items-center ud-space-x-4 ud-mb-5">
                  {feature.icons.map((icon, iconIndex) => (
                    <div
                      key={iconIndex}
                      className="ud-flex ud-items-center ud-justify-center ud-w-[70px] ud-h-[70px] ud-rounded-[14px] ud-bg-primary ud-bg-opacity-5 ud-text-primary"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">
                  {feature.title}
                </h3>
                <p className="ud-text-base ud-text-body-color ud-mb-8">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
