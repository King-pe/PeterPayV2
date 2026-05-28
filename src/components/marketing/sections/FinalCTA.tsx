import React from 'react';
import { Button } from '../../ui/Button';
export function FinalCTA() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-brand-950 mb-6">
          Start accepting payments today
        </h2>
        <p className="text-xl text-slate-600 mb-10">
          Join thousands of businesses building the future of commerce in Africa
          with PeterPay V2.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/register" size="lg" className="w-full sm:w-auto">
            Create free account
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto">
            
            Contact sales
          </Button>
        </div>
      </div>
    </section>);

}