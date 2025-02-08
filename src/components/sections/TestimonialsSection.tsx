import React from 'react';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    content: "Spreadify AI has transformed how we manage our social media. The AI-powered content suggestions and scheduling features save us hours every week.",
    author: "Sarah Johnson",
    role: "Social Media Manager",
    image: "/testimonials/sarah.jpg"
  },
  {
    content: "Being able to manage all our social platforms in one place is incredible. The analytics help us understand what content works best across different channels.",
    author: "Michael Chen",
    role: "Digital Marketing Director",
    image: "/testimonials/michael.jpg"
  },
  {
    content: "The platform's ability to adapt content for different social networks while maintaining brand consistency is a game-changer for our agency.",
    author: "Emma Rodriguez",
    role: "Content Strategist",
    image: "/testimonials/emma.jpg"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="ud-pt-[100px]">
      <div className="ud-container">
        <div className="ud-flex ud-justify-center ud--mx-4">
          <div className="ud-w-full ud-px-4">
            <div className="ud-max-w-[570px] ud-mx-auto ud-text-center ud-mb-[100px]">
              <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                What Our Users Say
              </h2>
              <p className="ud-text-base ud-text-body-color">
                Hear from social media managers who have transformed their workflow with Spreadify AI
              </p>
            </div>
          </div>
        </div>

        <div className="ud-flex ud-flex-wrap ud--mx-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="ud-w-full md:ud-w-1/2 lg:ud-w-1/3 ud-px-4">
              <div className="ud-bg-white dark:ud-bg-dark ud-p-10 lg:ud-py-8 lg:ud-px-5 xl:ud-p-10 ud-rounded-[20px] ud-rounded-tl-none ud-relative ud-z-10 ud-overflow-hidden ud-mb-10 ud-group hover:ud-bg-primary ud-transition-all ud-shadow-testimonial">
                <p className="ud-font-bold ud-text-base ud-text-black dark:ud-text-white ud-mb-9 group-hover:ud-text-white">
                  {testimonial.content}
                </p>

                <div className="ud-flex ud-items-center">
                  <div className="ud-w-12 ud-h-12 ud-rounded-full ud-overflow-hidden ud-mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="ud-w-full"
                    />
                  </div>
                  <div>
                    <h3 className="ud-font-bold ud-text-sm ud-text-black dark:ud-text-white group-hover:ud-text-white">
                      {testimonial.author}
                    </h3>
                    <p className="ud-font-semibold ud-text-xs ud-text-body-color group-hover:ud-text-white group-hover:ud-text-opacity-70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <span className="ud-absolute ud-top-0 ud-right-0 ud--z-1 ud-text-primary group-hover:ud-text-white">
                  <svg
                    width="63"
                    height="30"
                    viewBox="0 0 63 30"
                    className="ud-fill-current"
                  >
                    <circle
                      cx="7.21563"
                      cy="10.1013"
                      r="1.14106"
                      transform="rotate(-118.771 7.21563 10.1013)"
                    />
                    <circle
                      cx="24.8191"
                      cy="0.43515"
                      r="1.14106"
                      transform="rotate(-118.771 24.8191 0.43515)"
                    />
                    <circle
                      cx="16.7716"
                      cy="27.5037"
                      r="1.14106"
                      transform="rotate(-118.771 16.7716 27.5037)"
                    />
                    <circle
                      cx="2.38256"
                      cy="1.2995"
                      r="1.14106"
                      transform="rotate(-118.771 2.38256 1.2995)"
                    />
                    <circle
                      cx="25.5737"
                      cy="22.6717"
                      r="1.14106"
                      transform="rotate(-118.771 25.5737 22.6717)"
                    />
                    <circle
                      cx="34.3754"
                      cy="17.8386"
                      r="1.14106"
                      transform="rotate(-118.771 34.3754 17.8386)"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
