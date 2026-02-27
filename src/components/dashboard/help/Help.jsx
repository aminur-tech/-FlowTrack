import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  FileText, 
  Video, 
  ChevronDown,
  LifeBuoy,
  Mail,
  ArrowRight
} from 'lucide-react';

const Help = () => {
  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { 
      id: 1,
      q: "How do I export my product data?", 
      a: "Navigate to the Products page and click the 'Export' button in the top right corner. You can choose between CSV and PDF formats. Your download will start automatically once the file is generated." 
    },
    { 
      id: 2,
      q: "Can I change my subscription plan?", 
      a: "Yes, go to Settings > General and select 'Upgrade Plan'. You can switch between Basic, Premium, and Enterprise tiers. Changes are usually applied immediately to your account." 
    },
    { 
      id: 3,
      q: "Is there a limit on team members?", 
      a: "Enterprise plans support unlimited members. Basic plans allow up to 5 members, and Premium plans allow up to 25. You can manage permissions in the 'Users' tab." 
    },
    { 
      id: 4,
      q: "How secure is my data?", 
      a: "We use industry-standard AES-256 encryption for all stored data. Our servers are SOC2 compliant and we perform regular third-party security audits." 
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
          <LifeBuoy size={14} />
          Support Center
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-950 dark:text-emerald-50 tracking-tight">
          How can we help?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          Search our knowledge base or browse categories below to find answers.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-8 px-4 md:px-0">
          <Search className="absolute left-8 md:left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles, guides, and more..." 
            className="w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-lg shadow-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all dark:text-white placeholder:text-gray-400"
          />
        </div>
      </section>

      {/* --- QUICK CATEGORIES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Knowledge Base', desc: 'Detailed documentation for all features.', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
          { title: 'Video Tutorials', desc: 'Step-by-step visual guides for beginners.', icon: Video, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
          { title: 'API Reference', desc: 'Developer docs for custom integrations.', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
        ].map((item, idx) => (
          <div key={idx} className="group p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-pointer">
            <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{item.desc}</p>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
              Explore Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* --- FAQ SECTION (FUNCTIONAL ACCORDION) --- */}
      <section className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-6 md:p-12 shadow-sm">
        <div className="flex items-center gap-3 mb-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`rounded-2xl border transition-all ${
                openFaq === faq.id 
                ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-900/5' 
                : 'border-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="flex items-center justify-between w-full p-5 text-left transition-colors"
              >
                <span className={`font-semibold transition-colors ${
                  openFaq === faq.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {faq.q}
                </span>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180 text-emerald-600' : ''}`} 
                />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SUPPORT --- */}
      <div className="bg-emerald-900 dark:bg-emerald-950 rounded-[2.5rem] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h3>
          <p className="text-emerald-100/70 mb-10 max-w-md mx-auto text-sm md:text-base">
            Can't find what you're looking for? Chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-emerald-900 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group">
              <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
              Start Live Chat
            </button>
            <button className="bg-emerald-800/50 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-800 transition-all border border-emerald-700/50 flex items-center justify-center gap-2">
              <Mail size={20} />
              Email Support
            </button>
          </div>
        </div>
        
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-[100px] -ml-40 -mb-40"></div>
      </div>
    </div>
  );
};

export default Help;