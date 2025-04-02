import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0c1736] to-[#0e1c44] text-white py-5 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Left Side - Logo & Description */}
          <div className="col-span-1">
            <div className="mb-6 flex items-center">
              <img 
                src="/LOGO-Pipeline.png" 
                alt="Pipeline Generator Logo" 
                className="h-12 w-auto mr-2 drop-shadow-lg" 
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Empowering businesses with accurate lead data for better conversions and growth.
            </p>
          </div>

          {/* Right Side - Contact Details (Stacked) */}
          <div className="col-span-1 md:col-start-2 lg:col-start-4 md:text-right">
            <div className="space-y-5">
              <div className="flex md:justify-end items-center group">
                <Mail className="w-6 h-6 text-brand-400 mr-3 group-hover:text-brand-300 transition-colors duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200 cursor-pointer">
                  admin@pipelinegenerator.com
                </span>
              </div>
              <div className="flex md:justify-end items-center group">
                <Phone className="w-6 h-6 text-brand-400 mr-3 group-hover:text-brand-300 transition-colors duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200 cursor-pointer">
                +1(320) 427-4947
                </span>
              </div>
              <div className="flex md:justify-end items-center group">
                <MapPin className="w-6 h-6 text-brand-400 mr-3 group-hover:text-brand-300 transition-colors duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200 cursor-pointer">
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p className="hover:text-gray-300 transition-colors duration-200">
              © {new Date().getFullYear()} Pipeline Generator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
