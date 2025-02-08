import React from 'react';
import { ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';

// Custom TikTok icon since it's not in lucide-react
interface IconProps {
  className?: string;
}

const TikTok: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom Threads icon
const Threads: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-6.88 17.26l5.27-5.27a3 3 0 1 1 4.24 4.24l-5.27 5.27A10 10 0 1 0 12 2z" />
  </svg>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="ud-pt-[120px] lg:ud-pt-[150px]">
        <div className="ud-container">
          <div className="ud-flex ud-flex-wrap ud--mx-4">
            <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
              <div className="ud-max-w-[520px] ud-mx-auto lg:ud-mx-0 ud-text-center lg:ud-text-left">
                <h1 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                  Manage Your Social Media with Spreadify AI
                </h1>
                <p className="ud-text-base ud-text-body-color dark:ud-text-white ud-mb-12">
                  Schedule, collaborate, and manage your social media content across all platforms. 
                  Powered by AI to help you create engaging content that resonates with your audience.
                </p>

                <div className="ud-flex ud-flex-wrap ud-items-center ud-justify-center lg:ud-justify-start ud-space-x-4">
                  <Button className="ud-bg-primary hover:ud-bg-primary/90">
                    Get Started Free
                    <ArrowRight className="ud-ml-2 ud-h-4 ud-w-4" />
                  </Button>
                  <Button variant="outline">
                    Watch Demo
                  </Button>
                </div>

                <div className="ud-flex ud-items-center ud-justify-center lg:ud-justify-start ud-mt-8 ud-space-x-6">
                  <Facebook className="ud-w-8 ud-h-8 ud-text-primary" />
                  <Twitter className="ud-w-8 ud-h-8 ud-text-primary" />
                  <Instagram className="ud-w-8 ud-h-8 ud-text-primary" />
                  <Youtube className="ud-w-8 ud-h-8 ud-text-primary" />
                  <TikTok className="ud-w-8 ud-h-8 ud-text-primary" />
                  <Threads className="ud-w-8 ud-h-8 ud-text-primary" />
                </div>
              </div>
            </div>

            <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
              <div className="ud-text-center">
                <img
                  src="/hero-image.svg"
                  alt="Spreadify AI Dashboard"
                  className="ud-max-w-full ud-mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            {/* Facebook & Instagram */}
            <div className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-p-10 ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-features hover:ud-shadow-features-hover ud-transition-all ud-mb-8">
                <div className="ud-flex ud-items-center ud-justify-center ud-w-[70px] ud-h-[70px] ud-rounded-[14px] ud-bg-primary ud-bg-opacity-5 ud-text-primary ud-mb-5">
                  <Facebook className="ud-w-8 ud-h-8" />
                </div>
                <div>
                  <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">
                    Facebook & Instagram
                  </h3>
                  <p className="ud-text-base ud-text-body-color ud-mb-8">
                    Schedule posts, stories, and reels. Manage multiple pages and accounts with ease.
                  </p>
                </div>
              </div>
            </div>

            {/* Twitter & Threads */}
            <div className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-p-10 ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-features hover:ud-shadow-features-hover ud-transition-all ud-mb-8">
                <div className="ud-flex ud-items-center ud-justify-center ud-w-[70px] ud-h-[70px] ud-rounded-[14px] ud-bg-primary ud-bg-opacity-5 ud-text-primary ud-mb-5">
                  <Twitter className="ud-w-8 ud-h-8" />
                </div>
                <div>
                  <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">
                    Twitter & Threads
                  </h3>
                  <p className="ud-text-base ud-text-body-color ud-mb-8">
                    Create engaging tweets and threads. Schedule your content for maximum engagement.
                  </p>
                </div>
              </div>
            </div>

            {/* YouTube & TikTok */}
            <div className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-p-10 ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-features hover:ud-shadow-features-hover ud-transition-all ud-mb-8">
                <div className="ud-flex ud-items-center ud-justify-center ud-w-[70px] ud-h-[70px] ud-rounded-[14px] ud-bg-primary ud-bg-opacity-5 ud-text-primary ud-mb-5">
                  <Youtube className="ud-w-8 ud-h-8" />
                </div>
                <div>
                  <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">
                    YouTube Shorts & TikTok
                  </h3>
                  <p className="ud-text-base ud-text-body-color ud-mb-8">
                    Upload and schedule shorts and videos. Optimize your content for each platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="ud-pt-[100px]">
        <div className="ud-container">
          <div className="ud-flex ud-justify-center ud--mx-4">
            <div className="ud-w-full ud-px-4">
              <div className="ud-max-w-[570px] ud-mx-auto ud-text-center ud-mb-[100px]">
                <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                  How Spreadify AI Works
                </h2>
                <p className="ud-text-base ud-text-body-color">
                  Get started in minutes with our simple three-step process
                </p>
              </div>
            </div>
          </div>

          <div className="ud-flex ud-flex-wrap ud--mx-4">
            {/* Step 1 */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-text-center ud-mb-12">
                <div className="ud-w-[70px] ud-h-[70px] ud-rounded-full ud-bg-primary ud-text-white ud-text-3xl ud-flex ud-items-center ud-justify-center ud-mx-auto ud-mb-5">
                  1
                </div>
                <h3 className="ud-font-bold ud-text-xl ud-text-black dark:ud-text-white ud-mb-5">
                  Connect Your Accounts
                </h3>
                <p className="ud-text-base ud-text-body-color">
                  Link your social media accounts securely with just a few clicks
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-text-center ud-mb-12">
                <div className="ud-w-[70px] ud-h-[70px] ud-rounded-full ud-bg-primary ud-text-white ud-text-3xl ud-flex ud-items-center ud-justify-center ud-mx-auto ud-mb-5">
                  2
                </div>
                <h3 className="ud-font-bold ud-text-xl ud-text-black dark:ud-text-white ud-mb-5">
                  Create Content
                </h3>
                <p className="ud-text-base ud-text-body-color">
                  Use our AI-powered tools to create engaging content for all platforms
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-text-center ud-mb-12">
                <div className="ud-w-[70px] ud-h-[70px] ud-rounded-full ud-bg-primary ud-text-white ud-text-3xl ud-flex ud-items-center ud-justify-center ud-mx-auto ud-mb-5">
                  3
                </div>
                <div>
                  <h3 className="ud-font-bold ud-text-xl ud-text-black dark:ud-text-white ud-mb-5">
                    Schedule & Analyze
                  </h3>
                  <p className="ud-text-base ud-text-body-color">
                    Schedule posts and track performance across all platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="ud-pt-[100px]">
        <div className="ud-container">
          <div className="ud-flex ud-justify-center ud--mx-4">
            <div className="ud-w-full ud-px-4">
              <div className="ud-max-w-[570px] ud-mx-auto ud-text-center ud-mb-[100px]">
                <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                  Simple, Transparent Pricing
                </h2>
                <p className="ud-text-base ud-text-body-color">
                  Choose the perfect plan for your social media needs
                </p>
              </div>
            </div>
          </div>

          <div className="ud-flex ud-flex-wrap ud--mx-4">
            {/* Basic Plan */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-pricing ud-p-10 ud-mb-8">
                <h3 className="ud-font-bold ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">Basic</h3>
                <div className="ud-text-primary ud-text-[40px] ud-font-bold ud-mb-8">$29<span className="ud-text-base ud-font-medium ud-text-body-color">/mo</span></div>
                <div className="ud-mb-8">
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ 3 Social Media Platforms</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Basic Analytics</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ 100 Posts/Month</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Basic Support</p>
                </div>
                <Button variant="outline" className="ud-w-full">Get Started</Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-bg-primary ud-rounded-[20px] ud-shadow-pricing ud-p-10 ud-mb-8 ud-relative ud-z-10">
                <span className="ud-absolute ud-top-4 ud-right-4 ud-bg-white dark:ud-bg-dark ud-rounded-full ud-px-4 ud-py-1 ud-text-sm ud-font-medium ud-text-primary">Popular</span>
                <h3 className="ud-font-bold ud-text-2xl ud-text-white ud-mb-5">Pro</h3>
                <div className="ud-text-white ud-text-[40px] ud-font-bold ud-mb-8">$79<span className="ud-text-base ud-font-medium ud-text-white/70">/mo</span></div>
                <div className="ud-mb-8">
                  <p className="ud-text-base ud-text-white/70 ud-mb-4">✓ All Social Media Platforms</p>
                  <p className="ud-text-base ud-text-white/70 ud-mb-4">✓ Advanced Analytics</p>
                  <p className="ud-text-base ud-text-white/70 ud-mb-4">✓ Unlimited Posts</p>
                  <p className="ud-text-base ud-text-white/70 ud-mb-4">✓ Priority Support</p>
                  <p className="ud-text-base ud-text-white/70 ud-mb-4">✓ AI Content Generation</p>
                </div>
                <Button variant="secondary" className="ud-w-full ud-bg-white ud-text-primary hover:ud-bg-white/90">Get Started</Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className="ud-bg-white dark:ud-bg-dark ud-rounded-[20px] ud-shadow-pricing ud-p-10 ud-mb-8">
                <h3 className="ud-font-bold ud-text-2xl ud-text-black dark:ud-text-white ud-mb-5">Enterprise</h3>
                <div className="ud-text-primary ud-text-[40px] ud-font-bold ud-mb-8">Custom</div>
                <div className="ud-mb-8">
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Custom Solutions</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Advanced Team Features</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Custom Integrations</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ 24/7 Dedicated Support</p>
                  <p className="ud-text-base ud-text-body-color ud-mb-4">✓ Custom AI Training</p>
                </div>
                <Button variant="outline" className="ud-w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ud-pt-[100px] ud-pb-[120px]">
        <div className="ud-container">
          <div className="ud-bg-gradient-1 dark:ud-bg-dark ud-rounded-[20px] ud-relative ud-z-10 ud-overflow-hidden ud-p-8 md:ud-p-[70px]">
            <div className="ud-flex ud-flex-wrap ud-items-center ud--mx-4">
              <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
                <div className="ud-mb-12 lg:ud-mb-0">
                  <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-6">
                    Ready to Transform Your Social Media?
                  </h2>
                  <p className="ud-text-base ud-text-body-color dark:ud-text-white ud-mb-8">
                    Join thousands of social media managers who trust Spreadify AI
                  </p>
                  <Button className="ud-bg-white ud-text-primary hover:ud-bg-white/90">
                    Get Started Free
                  </Button>
                </div>
              </div>
              <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
                <div className="ud-text-center">
                  <img
                    src="/cta-image.svg"
                    alt="Get Started with Spreadify AI"
                    className="ud-max-w-full ud-mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
