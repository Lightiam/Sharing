import React from 'react';

const testimonials = [
  {
    content: "Spreadify AI has transformed how we manage our social media presence. The AI-powered content suggestions and scheduling features save us hours every week.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    image: "/images/testimonial/image-1.png"
  },
  {
    content: "The ability to manage all our social platforms in one place with AI assistance has been a game-changer. Our engagement rates have improved significantly.",
    author: "Michael Chen",
    role: "Social Media Manager",
    image: "/images/testimonial/image-2.png"
  },
  {
    content: "The platform's AI capabilities for content optimization and the unified dashboard make social media management effortless and effective.",
    author: "Emily Rodriguez",
    role: "Content Creator",
    image: "/images/testimonial/image-3.png"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonial" className="ud-pt-[100px]">
      <div className="ud-container">
        <div className="ud-flex ud-justify-center ud--mx-4">
          <div className="ud-w-full ud-px-4">
            <div className="ud-max-w-[570px] ud-mx-auto ud-text-center ud-mb-[70px]">
              <h2 className="ud-font-extrabold ud-text-3xl sm:ud-text-4xl ud-text-black dark:ud-text-white ud-mb-5">
                What Our Users Say
              </h2>
              <p className="ud-text-base ud-text-body-color">
                Discover how Spreadify AI is helping businesses transform their social media presence
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
                    <img src={testimonial.image} alt={testimonial.author} className="ud-w-full" />
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
