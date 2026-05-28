import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
export function TransactionListMock() {
  const transactions = [
  {
    id: 1,
    type: 'in',
    name: 'John Doe',
    ref: 'ORDER-1001',
    amount: '+50,000',
    time: '2 mins ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'out',
    name: 'Vendor Payout',
    ref: 'PAY-7782',
    amount: '-25,000',
    time: '1 hour ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'in',
    name: 'Jane Smith',
    ref: 'ORDER-1002',
    amount: '+120,000',
    time: '3 hours ago',
    status: 'success'
  },
  {
    id: 4,
    type: 'in',
    name: 'Acme Corp',
    ref: 'INV-042',
    amount: '+450,000',
    time: 'Yesterday',
    status: 'success'
  }];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut'
      }}
      className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden w-full max-w-sm">
      
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 text-sm">
          Recent Transactions
        </h3>
        <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-md">
          View all
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {transactions.map((tx, i) =>
        <motion.div
          key={tx.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4,
            delay: 0.4 + i * 0.1
          }}
          className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          
            <div className="flex items-center gap-3">
              <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
              
                {tx.type === 'in' ?
              <ArrowDownLeft size={16} /> :

              <ArrowUpRight size={16} />
              }
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{tx.name}</p>
                <p className="text-xs text-slate-500">
                  {tx.ref} • {tx.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
              className={`text-sm font-semibold ${tx.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>
              
                {tx.amount}
              </p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                  Paid
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>);

}