import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How does Spreadify AI help with content creation?",
    answer: "Spreadify AI uses advanced artificial intelligence to help you create engaging content tailored for each social platform. It analyzes your brand voice, audience engagement patterns, and platform-specific trends to suggest optimized content."
  },
  {
    question: "Which social media platforms are supported?",
    answer: "We support all major social media platforms including Facebook, Twitter, Instagram, YouTube Shorts, TikTok, and Threads. You can manage and schedule content for all these platforms from a single dashboard."
  },
  {
    question: "Can I schedule posts across different time zones?",
    answer: "Yes, Spreadify AI supports scheduling across multiple time zones. You can set your preferred time zone for each social media account and schedule posts accordingly for optimal engagement times."
  },
  {
    question: "Do you offer team collaboration features?",
    answer: "Yes, our Pro and Enterprise plans include comprehensive team collaboration features. Multiple team members can create, review, and schedule content with customizable roles and permissions."
  },
  {
    question: "How does the AI content optimization work?",
    answer: "Our AI analyzes your historical post performance, audience engagement patterns, and platform-specific trends to suggest optimal posting times, hashtags, and content formats for maximum reach and engagement."
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer: "The Basic plan includes up to 100 posts per month. Pro plan users get unlimited posts across all platforms. Enterprise plans can be customized based on your specific needs."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="ud-pt-[100px] ud-overflow-hidden">
      <div className="ud-container">
        <div className="ud-flex ud-justify-center ud--mx-4">
          <div className="ud-w-full ud-px-4">
            <div className="ud-max-w-[510px] ud-mx-auto ud-text-center ud-mb-[70px]">
              <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                Frequently Asked Questions
              </h2>
              <p className="ud-font-semibold ud-text-base ud-text-body-color">
                Everything you need to know about Spreadify AI and our social media management platform
              </p>
            </div>
          </div>
        </div>

        <div className="ud-flex ud-flex-wrap ud--mx-4">
          <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
            <div className="ud-mb-12 lg:ud-mb-0 ud-relative ud-z-10">
              <div className="ud-bg-white dark:ud-bg-dark ud-border ud-border-[#e4f2fe] ud-rounded-2xl ud-py-12 ud-px-8 sm:ud-p-12 md:ud-py-14 lg:ud-py-10 lg:ud-px-8 xl:ud-p-12 2xl:ud-p-14">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div key={index} className={index !== 2 ? "ud-mb-12" : ""}>
                    <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl lg:ud-text-xl xl:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-4">
                      {faq.question}
                    </h3>
                    <p className="ud-font-semibold ud-text-base ud-text-body-color">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ud-w-full lg:ud-w-1/2 ud-px-4">
            <div className="ud-relative ud-z-10">
              <div className="ud-bg-white dark:ud-bg-dark ud-border ud-border-[#e4f2fe] ud-rounded-2xl ud-py-12 ud-px-8 sm:ud-p-12 md:ud-py-14 lg:ud-py-10 lg:ud-px-8 xl:ud-p-12 2xl:ud-p-14">
                {faqs.slice(3).map((faq, index) => (
                  <div key={index} className={index !== 2 ? "ud-mb-12" : ""}>
                    <h3 className="ud-font-bold ud-text-xl sm:ud-text-2xl lg:ud-text-xl xl:ud-text-2xl ud-text-black dark:ud-text-white ud-mb-4">
                      {faq.question}
                    </h3>
                    <p className="ud-font-semibold ud-text-base ud-text-body-color">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
