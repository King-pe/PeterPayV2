import React from 'react';
import { Button } from '../../ui/Button';
import { CheckoutMock } from '../visuals/CheckoutMock';
import { TransactionListMock } from '../visuals/TransactionListMock';
import { motion } from 'framer-motion';
export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50 via-white to-white"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5
              }}>
              
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-6 border border-brand-100">
                <span className="flex h-2 w-2 rounded-full bg-brand-600"></span>
                PeterPay V2 is now live
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-950 tracking-tight mb-6 text-balance leading-[1.1]">
                Modern payment infrastructure for Africa.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 text-balance">
                The developer-first payment OS. Accept payments, send payouts,
                manage wallets, and scale your business with one unified API.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button href="/register" size="lg" className="w-full sm:w-auto">
                  Create account
                </Button>
                <Button
                  href="/developers"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white">
                  
                  View API docs
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                No setup fees. Sandbox access immediately.
              </p>
            </motion.div>
          </div>

          {/* Visuals */}
          <div className="lg:col-span-6 relative lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Checkout Mock */}
              <div className="relative z-20 md:translate-x-[-10%]">
                <CheckoutMock />
              </div>

              {/* Secondary Transaction Mock */}
              <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/3 translate-x-[20%] z-10 w-full max-w-sm">
                <TransactionListMock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}