import React from 'react';
import { Button } from '../ui/button';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const TikTok = () => (
  <svg className="ud-w-6 ud-h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Threads = () => (
  <svg className="ud-w-6 ud-h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-6.88 17.26l5.27-5.27a3 3 0 1 1 4.24 4.24l-5.27 5.27A10 10 0 1 0 12 2z" />
  </svg>
);

export default function HeroSection() {
  return (
    <section id="home" className="ud-relative ud-pt-[120px] ud-pb-[110px] ud-bg-white dark:ud-bg-dark">
      <div className="ud-container">
        <div className="ud-flex ud-flex-wrap ud--mx-4">
          <div className="ud-w-full lg:ud-w-5/12 ud-px-4">
            <div className="ud-hero-content ud-mb-[100px] lg:ud-mb-0">
              <h1 className="ud-text-black dark:ud-text-white ud-font-bold ud-text-4xl sm:ud-text-5xl md:ud-text-6xl ud-leading-tight sm:ud-leading-tight md:ud-leading-tight ud-mb-8">
                Manage All Your Social Media in One Place with{" "}
                <span className="ud-text-primary">AI Power</span>
              </h1>
              <p className="ud-text-base ud-text-body-color dark:ud-text-white ud-mb-12 ud-max-w-[520px]">
                Schedule, analyze, and optimize your content across all major social platforms. 
                Leverage AI to create engaging content that resonates with your audience.
              </p>

              <div className="ud-flex ud-flex-wrap ud-items-center">
                <Button className="ud-bg-primary hover:ud-bg-primary/90 ud-text-white ud-rounded-lg ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-transition ud-duration-300 hover:ud-shadow-primary-hover ud-mr-4 ud-mb-4">
                  Start Free Trial
                </Button>
                <Button variant="outline" className="ud-border-2 ud-border-primary ud-text-primary hover:ud-bg-primary hover:ud-text-white ud-rounded-lg ud-py-3 ud-px-6 ud-text-base ud-font-medium ud-transition ud-duration-300 ud-mb-4">
                  Watch Demo
                </Button>
              </div>

              <div className="ud-flex ud-items-center ud-mt-8 ud-space-x-4 ud-text-body-color dark:ud-text-white/60">
                <span>Supported Platforms:</span>
                <div className="ud-flex ud-space-x-3">
                  <Facebook className="ud-w-6 ud-h-6" />
                  <Twitter className="ud-w-6 ud-h-6" />
                  <Instagram className="ud-w-6 ud-h-6" />
                  <Youtube className="ud-w-6 ud-h-6" />
                  <TikTok />
                  <Threads />
                </div>
              </div>
            </div>
          </div>

          <div className="ud-w-full lg:ud-w-7/12 ud-px-4">
            <div className="ud-relative ud-z-10 ud-ml-0 lg:ud-ml-[50px]">
              <img
                src="/images/hero/dashboard-preview.png"
                alt="Social Media Dashboard"
                className="ud-max-w-full ud-rounded-[10px]"
              />
              <span className="ud-absolute ud--z-1 ud-top-0 ud-left-0 ud-w-full ud-h-full ud-bg-[#8b5cf6] ud-opacity-[0.08] ud-rounded-[10px]"></span>

              {/* Floating Elements */}
              <div className="ud-absolute ud--z-1 ud-top-0 ud-left-0">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  className="ud-animate-float"
                >
                  <circle cx="100" cy="100" r="96" stroke="#8b5cf6" strokeWidth="8" strokeDasharray="20 20" />
                </svg>
              </div>

              <div className="ud-absolute ud--z-1 ud-bottom-0 ud-right-0">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                  className="ud-animate-float-reverse"
                >
                  <path
                    d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0Z"
                    fill="#8b5cf6"
                    fillOpacity="0.08"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
