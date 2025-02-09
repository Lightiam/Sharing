import { FC, ReactElement } from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TikTok: FC = () => (
  <svg className="ud-w-8 ud-h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Threads: FC = () => (
  <svg className="ud-w-8 ud-h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-6.88 17.26l5.27-5.27a3 3 0 1 1 4.24 4.24l-5.27 5.27A10 10 0 1 0 12 2z" />
  </svg>
);

interface Platform {
  title: string;
  description: string;
  features: string[];
  icons: ReactElement[];
}

const platforms: Platform[] = [
  {
    title: "Facebook & Instagram",
    description: "Schedule posts, stories, and reels. Manage multiple pages and accounts with ease.",
    features: [
      "Page & Profile Management",
      "Story & Reel Scheduling",
      "Cross-Platform Posting",
      "Engagement Analytics"
    ],
    icons: [<Facebook key="fb" className="ud-w-8 ud-h-8" />, <Instagram key="ig" className="ud-w-8 ud-h-8" />]
  },
  {
    title: "Twitter & Threads",
    description: "Create engaging tweets and threads. Schedule your content for maximum engagement.",
    features: [
      "Thread Creation",
      "Tweet Scheduling",
      "Hashtag Optimization",
      "Engagement Tracking"
    ],
    icons: [<Twitter key="tw" className="ud-w-8 ud-h-8" />, <Threads key="th" />]
  },
  {
    title: "YouTube Shorts & TikTok",
    description: "Upload and schedule shorts and videos. Optimize your content for each platform.",
    features: [
      "Video Upload & Scheduling",
      "Trend Analysis",
      "Performance Tracking",
      "Audience Insights"
    ],
    icons: [<Youtube key="yt" className="ud-w-8 ud-h-8" />, <TikTok key="tt" />]
  }
];

const FeaturesSection: FC = () => {
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
          {platforms.map((platform, index) => (
            <div key={index} className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-p-10 ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-features hover:ud-shadow-features-hover ud-transition-all ud-mb-8">
                <div className="ud-flex ud-items-center ud-space-x-4 ud-mb-5">
                  {platform.icons.map((icon, iconIndex) => (
                    <div
                      key={iconIndex}
                      className="ud-flex ud-items-center ud-justify-center ud-w-[70px] ud-h-[70px] ud-rounded-[14px] ud-bg-primary ud-bg-opacity-5 ud-text-primary"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">
                  {platform.title}
                </h3>
                <p className="ud-text-base ud-text-body-color ud-mb-8">
                  {platform.description}
                </p>
                <ul className="ud-space-y-4">
                  {platform.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="ud-flex ud-items-center ud-text-base ud-text-body-color">
                      <span className="ud-pr-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" className="ud-fill-current ud-text-primary">
                          <path d="M17.5 5.83333L7.50002 15.8333L2.91669 11.25L4.09169 10.075L7.50002 13.475L16.325 4.65833L17.5 5.83333Z" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
