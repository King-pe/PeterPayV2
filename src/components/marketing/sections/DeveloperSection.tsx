import React from 'react';
import { CodeBlock } from '../visuals/CodeBlock';
import { Button } from '../../ui/Button';
import { Terminal, BookOpen, Shield } from 'lucide-react';
export function DeveloperSection() {
  return (
    <section className="py-24 bg-brand-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: Code Block */}
          <div className="mb-12 lg:mb-0 relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-brand-500/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <CodeBlock />
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Built for developers, by developers.
            </h2>
            <p className="text-brand-200 text-lg mb-8 leading-relaxed">
              Integrate payments in minutes, not weeks. Our RESTful API is
              predictable, well-documented, and designed to handle edge cases so
              you don't have to.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="mt-1 bg-brand-800/50 p-2 rounded-lg h-fit">
                  <Terminal size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Instant Sandbox Access
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Start building immediately. No approvals needed to test our
                    APIs with mock data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-brand-800/50 p-2 rounded-lg h-fit">
                  <BookOpen size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Comprehensive SDKs
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Official libraries for JavaScript, PHP, and Python to speed
                    up your integration.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 bg-brand-800/50 p-2 rounded-lg h-fit">
                  <Shield size={20} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Secure Webhooks
                  </h3>
                  <p className="text-brand-200 text-sm">
                    Cryptographically signed events ensure you only process
                    legitimate status updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/developers" variant="white">
                Explore Documentation
              </Button>
              <Button
                href="/register"
                variant="outline"
                className="border-brand-700 text-white hover:bg-brand-800 hover:border-brand-600 focus:ring-brand-800">
                
                Get API Keys
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}