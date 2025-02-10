import React from 'react';

interface PricingTier {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
  description: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$29",
    description: "Perfect for individuals and small businesses",
    features: [
      "3 Social Media Platforms",
      "Basic Analytics Dashboard",
      "100 Posts/Month",
      "Content Calendar",
      "Basic Support (Email)",
      "Mobile App Access",
      "Basic Post Templates"
    ],
    buttonText: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "$79",
    popular: true,
    description: "Ideal for growing businesses and teams",
    features: [
      "All Social Media Platforms",
      "Advanced Analytics & Reports",
      "Unlimited Posts",
      "Priority Support (24/7)",
      "AI Content Generation",
      "Team Collaboration Tools",
      "Custom Workflows",
      "Bulk Scheduling",
      "Advanced Post Templates"
    ],
    buttonText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Custom Platform Solutions",
      "Advanced Team Management",
      "Custom API Integration",
      "24/7 Dedicated Support",
      "Custom AI Training",
      "Advanced Security Features",
      "SLA Guarantees",
      "Onboarding Manager",
      "Custom Analytics"
    ],
    buttonText: "Contact Sales"
  }
];

export default function PricingSection() {
  return (
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
          {pricingTiers.map((tier, index) => (
            <div key={index} className="ud-w-full md:ud-w-1/3 ud-px-4">
              <div className={`ud-relative ud-overflow-hidden ud-py-10 ud-px-8 sm:ud-p-12 md:ud-px-8 lg:ud-px-5 xl:ud-px-9 2xl:ud-px-12 ud-rounded-[20px] ud-border-2 ud-border-[#f3eeff] dark:ud-border-black ud-mb-12 ${
                tier.popular ? 'ud-bg-primary' : 'ud-bg-white dark:ud-bg-dark'
              }`}>
                {tier.popular && (
                  <span className="ud-absolute ud-top-4 ud-right-4 ud-bg-white dark:ud-bg-dark ud-rounded-full ud-px-4 ud-py-1 ud-text-sm ud-font-medium ud-text-primary">
                    Popular
                  </span>
                )}
                
                <span className={`ud-font-bold ud-text-xl ${
                  tier.popular ? 'ud-text-white' : 'ud-text-black dark:ud-text-white'
                } ud-mb-2 ud-block`}>
                  {tier.name} Plan
                </span>
                
                <p className={`ud-text-sm ${
                  tier.popular ? 'ud-text-white/80' : 'ud-text-body-color'
                } ud-mb-4`}>
                  {tier.description}
                </p>

                <h3 className={`ud-font-bold ${
                  tier.popular ? 'ud-text-white' : 'ud-text-black dark:ud-text-white'
                } ud-text-[40px]`}>
                  {tier.price}
                  {tier.price !== "Custom" && (
                    <span className={`ud-font-normal ud-text-base ${
                      tier.popular ? 'ud-text-white/70' : 'ud-text-body-color dark:ud-text-white'
                    }`}>
                      /month
                    </span>
                  )}
                </h3>

                <div className="ud-pt-8 ud-space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <p key={featureIndex} className={`ud-flex ud-items-center ud-font-semibold ud-text-base ${
                      tier.popular ? 'ud-text-white/70' : 'ud-text-body-color'
                    }`}>
                      <span className="ud-pr-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" className="ud-fill-current">
                          <path d="M17.5 5.83333L7.50002 15.8333L2.91669 11.25L4.09169 10.075L7.50002 13.475L16.325 4.65833L17.5 5.83333Z" />
                        </svg>
                      </span>
                      {feature}
                    </p>
                  ))}
                </div>

                <div className="ud-pt-8">
                  <button 
                    className={`ud-w-full ud-flex ud-items-center ud-justify-center ud-text-base ud-font-bold ud-p-3 ud-rounded-xl ${
                      tier.popular 
                        ? 'ud-bg-white ud-text-primary hover:ud-bg-white/90'
                        : 'ud-bg-primary ud-text-white hover:ud-shadow-primary-hover'
                    }`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
