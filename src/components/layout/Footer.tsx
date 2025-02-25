import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-midnight-900 text-silver-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl font-bold text-silver-100">Tu<span className="text-primary-500 text-glow">Hogar</span></span>
            </Link>
            <p className="text-silver-400 max-w-xs">
              Finding your perfect home with a modern, sophisticated approach to real estate. We make the journey to your dream home simple and enjoyable.
            </p>
            
            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-silver-100 font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-midnight-800 border border-midnight-700 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-silver-200"
                />
                <button className="bg-primary-500 hover:bg-primary-600 text-silver-100 px-4 rounded-r-lg flex items-center glow-effect">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="bg-midnight-800 p-2.5 rounded-full hover:bg-primary-500/20 transition-colors" aria-label="Facebook">
                <Facebook size={18} className="text-primary-400" />
              </a>
              <a href="#" className="bg-midnight-800 p-2.5 rounded-full hover:bg-primary-500/20 transition-colors" aria-label="Instagram">
                <Instagram size={18} className="text-primary-400" />
              </a>
              <a href="#" className="bg-midnight-800 p-2.5 rounded-full hover:bg-primary-500/20 transition-colors" aria-label="Twitter">
                <Twitter size={18} className="text-primary-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-silver-100 text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-silver-100 text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/buying" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Buying
                </Link>
              </li>
              <li>
                <Link href="/selling" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Selling
                </Link>
              </li>
              <li>
                <Link href="/renting" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Renting
                </Link>
              </li>
              <li>
                <Link href="/mortgage" className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center">
                  <ArrowRight size={14} className="mr-2 text-primary-500" />
                  Mortgage
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-bold text-silver-100 text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-silver-400">123 Home Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-silver-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-silver-400">info@tuhogar.com</span>
              </li>
            </ul>
            
            {/* Working Hours */}
            <div className="mt-6">
              <h4 className="font-semibold text-silver-100 mb-2">Working Hours</h4>
              <p className="text-silver-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-silver-400">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-silver-400">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-midnight-800">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-silver-500 text-sm">
              © {currentYear} TuHogar. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <Link href="/privacy" className="text-silver-500 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-silver-500 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-silver-500 hover:text-primary-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 