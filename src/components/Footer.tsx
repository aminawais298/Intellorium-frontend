import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-orange/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-button-gradient rounded-lg flex items-center justify-center shadow-orange-sm">
                <span className="text-white font-bold font-poppins">IB</span>
              </div>
              <div>
                <p className="font-bold font-poppins text-white leading-none">Intellorium</p>
                <p className="text-peach/40 text-[10px] font-montserrat">Business School</p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-inter leading-relaxed mb-4">
              First Business School to Provide Practical Experience. Build your business in 12 months.
            </p>
            <div className="flex gap-3">
              {[{ icon: <Instagram size={16} />, href: '#' }, { icon: <Linkedin size={16} />, href: '#' }, { icon: <Twitter size={16} />, href: '#' }, { icon: <Youtube size={16} />, href: '#' }].map((s, i) => (
                <a key={i} href={s.href} className="w-8 h-8 bg-orange/10 border border-orange/20 rounded-lg flex items-center justify-center text-orange/60 hover:text-orange hover:border-orange transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold font-poppins text-white mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home', '/'], ['Programs', '/programs'], ['Apply Now', '/apply'], ['Dashboard', '/dashboard'], ['About Us', '/#about']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/40 hover:text-orange transition-colors text-sm font-inter">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold font-poppins text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {[['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/40 hover:text-orange transition-colors text-sm font-inter">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold font-poppins text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <Mail size={14} className="text-orange mt-0.5 shrink-0" />
                <span>info@intellorium.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <Phone size={14} className="text-orange mt-0.5 shrink-0" />
                <span>+92 300 000 0000</span>
              </li>
              <li className="flex items-start gap-2 text-white/40 text-sm">
                <MapPin size={14} className="text-orange mt-0.5 shrink-0" />
                <span>Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-orange/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-inter">© {new Date().getFullYear()} Intellorium Business School. All rights reserved.</p>
          <p className="text-white/20 text-xs font-inter">Build Your Business. Change Your Life.</p>
        </div>
      </div>
    </footer>
  );
}
