
import { Phone, Laptop, UserCheck, Megaphone, Mail } from 'lucide-react';

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Step = ({ number, title, description, icon }: StepProps) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-display font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </div>
);

const ProcessSteps = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            How Our Inbound Voice Agent Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Getting started with Pipeline Generator is simple. Our AI-powered voice agents help your home service or franchise business convert more calls with less effort.
          </p>
        </div>

        <div className="grid gap-12 max-w-4xl mx-auto">
          <Step 
            number="1"
            title="Schedule a Quick Demo"
            description="We'll show you how our voice agents handle calls for your specific home service or franchise business needs."
            icon={<Phone className="h-6 w-6 text-brand-500" />}
          />
          
          <Step 
            number="2"
            title="Fast Integration (24-48 hours)"
            description="We'll connect Pipeline Generator with your scheduling software like HouseCallPro, ServiceTitan, or Jobber for seamless operations."
            icon={<Laptop className="h-6 w-6 text-brand-500" />}
          />
          
          <Step 
            number="3"
            title="Customize Your Voice Agent"
            description="Your AI agent learns about your services, pricing, and procedures to accurately represent your business."
            icon={<UserCheck className="h-6 w-6 text-brand-500" />}
          />
          
          <Step 
            number="4"
            title="Start Converting More Calls"
            description="Your voice agent goes live, answering inbound calls, qualifying leads, and booking appointments 24/7."
            icon={<Megaphone className="h-6 w-6 text-brand-500" />}
          />
          
          <Step 
            number="5"
            title="Grow Your Service Business"
            description="With more calls converted to bookings, your technicians stay busy and your business grows faster."
            icon={<Mail className="h-6 w-6 text-brand-500" />}
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
