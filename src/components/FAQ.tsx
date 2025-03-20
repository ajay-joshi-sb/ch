import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import CTAButton from './CTAButton';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className="border-b border-white/10 last:border-b-0 reveal-on-scroll">
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <Minus className="h-5 w-5 text-brand-400" />
          ) : (
            <Plus className="h-5 w-5 text-brand-400" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5 px-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the PipelineGenerator voice agent work?",
      answer: "PipelineGenerator's AI voice agent answers your inbound calls 24/7, using natural language processing to understand customer inquiries, qualify leads, and book appointments directly in your scheduling system. It integrates with your existing CRM or field service software like HouseCallPro, ServiceTitan, or Jobber to ensure seamless operation."
    },
    {
      question: "Can the voice agent handle complex customer requests?",
      answer: "Yes! Our voice agent is trained specifically for home service scenarios and can handle appointment scheduling, service inquiries, basic troubleshooting, and emergency triage. For complex situations beyond its capabilities, it can escalate to your on-call team or schedule a callback during business hours."
    },
    {
      question: "Will customers know they're talking to an AI?",
      answer: "We believe in transparency, so the voice agent identifies itself as an AI assistant. However, our voice technology is so natural that many customers report forgetting they're speaking with an AI. The experience is designed to be helpful and conversational, not robotic."
    },
    {
      question: "How does PipelineGenerator integrate with my existing software?",
      answer: "PipelineGenerator has built-in integrations with popular home service platforms including HouseCallPro, ServiceTitan, Jobber, Acculynx, Calendly, Google Calendar, and CallRail. Our team handles the setup process with you, ensuring data flows seamlessly between systems. We also offer custom API integrations for enterprise clients."
    },
    {
      question: "How quickly can I get up and running?",
      answer: "Most customers are fully operational within 3-5 business days. This includes integration setup, voice agent training on your specific services, and testing. For businesses with standard workflows, we can sometimes deploy even faster."
    },
    {
      question: "What happens if the voice agent can't answer a question?",
      answer: "If a customer asks something outside the voice agent's knowledge base, it will gracefully acknowledge the limitation and offer to take a message, schedule a callback, or transfer to an on-call person depending on your preference and the urgency of the situation."
    },
    {
      question: "Can I customize what the voice agent says?",
      answer: "Absolutely! You can customize the script, greeting, questions asked for qualification, service offerings, pricing discussions, and more. Enterprise plans include fully branded voice experiences tailored to your company's tone and style."
    },
    {
      question: "How do I measure the ROI of using PipelineGenerator?",
      answer: "Our dashboard provides comprehensive analytics on call volume, conversion rates, appointment bookings, and lead qualification. You'll see exactly how many calls would have been missed otherwise, how many appointments were booked, and the estimated revenue value based on your average ticket value."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-darkblue">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-100 bg-brand-700/30 rounded-full reveal-on-scroll">
            Questions & Answers
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white text-balance reveal-on-scroll">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto reveal-on-scroll">
            Everything you need to know about PipelineGenerator's AI voice agents for your home service business
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card rounded-xl overflow-hidden">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default FAQ;
