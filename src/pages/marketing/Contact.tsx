import React from 'react';
import { MarketingLayout } from '../../components/marketing/MarketingLayout';
import { Button } from '../../components/ui/Button';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { useScreenInit } from '../../useScreenInit';
export function Contact() {
  useScreenInit();
  return (
    <MarketingLayout>
      <div className="pt-32 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <h1 className="text-4xl font-bold text-brand-950 mb-6">
                Contact Sales
              </h1>
              <p className="text-lg text-slate-600 mb-12">
                Ready to scale your payments? Fill out the form and our team
                will get back to you within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Technical Support
                    </h3>
                    <p className="text-slate-600 text-sm mb-2">
                      Already a customer? Get help from our engineering team.
                    </p>
                    <a
                      href="#"
                      className="text-brand-600 font-medium text-sm hover:underline">
                      
                      Go to Support Portal &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <Mail className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Us</h3>
                    <p className="text-slate-600 text-sm">sales@peterpay.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Headquarters
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                    
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                  
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                  
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Estimated Monthly Volume
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white">
                    <option>Less than TZS 10M</option>
                    <option>TZS 10M - 50M</option>
                    <option>TZS 50M - 200M</option>
                    <option>More than TZS 200M</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none">
                  </textarea>
                </div>

                <Button type="submit" variant="primary" fullWidth size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>);

}