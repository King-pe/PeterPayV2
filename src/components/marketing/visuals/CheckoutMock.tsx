import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, Smartphone } from 'lucide-react';
export function CheckoutMock() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        rotateX: 10
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut'
      }}
      className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden w-full max-w-sm mx-auto"
      style={{
        perspective: 1000
      }}>
      
      {/* Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-brand-600 font-bold text-xl">A</span>
        </div>
        <h3 className="font-semibold text-slate-900">Acme Store</h3>
        <p className="text-slate-500 text-sm">Order #1001</p>
        <div className="mt-4 text-3xl font-bold text-slate-900">
          <span className="text-lg text-slate-500 font-medium mr-1">TZS</span>
          50,000
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <p className="text-sm font-medium text-slate-700 mb-2">Pay with</p>

        {/* Payment Methods */}
        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 border-2 border-brand-600 rounded-xl bg-brand-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="text-brand-600" size={20} />
              <span className="font-medium text-brand-900">Mobile Money</span>
            </div>
            <div className="w-4 h-4 rounded-full border-4 border-brand-600 bg-white"></div>
          </label>

          <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="text-slate-500" size={20} />
              <span className="font-medium text-slate-700">Bank Card</span>
            </div>
            <div className="w-4 h-4 rounded-full border border-slate-300"></div>
          </label>
        </div>

        {/* Form */}
        <div className="pt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              value="255 740 000 000"
              readOnly
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-slate-50 text-slate-700" />
            
          </div>
          <button className="w-full bg-brand-600 text-white font-medium py-3 rounded-lg shadow-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
            Pay TZS 50,000
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-emerald-500" />
        Secured by PeterPay
      </div>
    </motion.div>);

}