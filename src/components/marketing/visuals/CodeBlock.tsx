import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
type Tab = {
  id: string;
  label: string;
  code: React.ReactNode;
};
const tabs: Tab[] = [
{
  id: 'create-payment',
  label: 'Create Payment',
  code:
  <>
        <span className="text-pink-400">const</span>
        {'response = '}
        <span className="text-pink-400">await</span>
        {'peterpay.'}
        <span className="text-blue-400">payments</span>
        {'.'}
        <span className="text-yellow-200">create</span>
        {'('}
        {`{`}
        <br />
        {'  '}
        {'amount: '}
        <span className="text-orange-300">50000</span>
        {','}
        <br />
        {'  '}
        {'currency: '}
        <span className="text-green-300">'TZS'</span>
        {','}
        <br />
        {'  '}
        {'reference: '}
        <span className="text-green-300">'ORDER-1001'</span>
        {','}
        <br />
        {'  '}
        {'customer: '}
        {`{`}
        <br />
        {'    '}
        {'name: '}
        <span className="text-green-300">'John Doe'</span>
        {','}
        <br />
        {'    '}
        {'email: '}
        <span className="text-green-300">'john@example.com'</span>
        {','}
        <br />
        {'    '}
        {'phone: '}
        <span className="text-green-300">'255740000000'</span>
        {'}'}
        <br />
        {'  '}
        {','}
        <br />
        {'  '}
        {'callback_url: '}
        <span className="text-green-300">
          'https://api.yoursite.com/webhook'
        </span>
        {','}
        <br />
        {`}`})
        <br />
        <br />
        <span className="text-slate-400">
          {' // Returns checkout_url for redirect'}
        </span>
        <br />
        <span className="text-blue-300">console</span>.
        <span className="text-yellow-200">log</span>(
        {`response.data.checkout_url`})
      </>

},
{
  id: 'verify-payment',
  label: 'Verify Payment',
  code:
  <>
        <span className="text-pink-400">const</span>
        {'payment = '}
        <span className="text-pink-400">await</span>
        {'peterpay.'}
        <span className="text-blue-400">payments</span>
        {'.'}
        <span className="text-yellow-200">verify</span>
        {'('}
        <span className="text-green-300">'pay_01HXYZ123'</span>
        {')'}
        <br />
        <br />
        <span className="text-pink-400">if</span>
        {' if (payment.data.status === '}
        <span className="text-green-300">'success'</span>
        {') {'}
        <br />
        {'  '}
        <span className="text-slate-400">{' // Fulfill the order'}</span>
        <br />
        {'  '}
        <span className="text-pink-400">await</span> db.
        <span className="text-blue-400">orders</span>.
        <span className="text-yellow-200">update</span>({`{`}
        <br />
        {'    '}id: payment.data.reference,
        <br />
        {'    '}status: <span className="text-green-300">'paid'</span>
        <br />
        {'  }'});
        <br />
        {'}'}
      </>

},
{
  id: 'create-payout',
  label: 'Create Payout',
  code:
  <>
        <span className="text-pink-400">const</span>
        {'payout = '}
        <span className="text-pink-400">await</span>
        {'peterpay.'}
        <span className="text-blue-400">payouts</span>
        {'.'}
        <span className="text-yellow-200">create</span>
        {'('}
        {`{`}
        <br />
        {'  '}
        {'amount: '}
        <span className="text-orange-300">25000</span>
        {','}
        <br />
        {'  '}
        {'currency: '}
        <span className="text-green-300">'TZS'</span>
        {','}
        <br />
        {'  '}
        {'recipient: '}
        {`{`}
        <br />
        {'    '}
        {'type: '}
        <span className="text-green-300">'mobile_money'</span>
        {','}
        <br />
        {'    '}
        {'phone: '}
        <span className="text-green-300">'255740000000'</span>
        {','}
        <br />
        {'    '}
        {'network: '}
        <span className="text-green-300">'mpesa'</span>
        <br />
        {'  '}
        {','}
        <br />
        {'  '}
        {'reference: '}
        <span className="text-green-300">'PAYOUT-7782'</span>
        <br />
        {`}`});
      </>

}];

export function CodeBlock() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <div className="rounded-xl overflow-hidden bg-[#0D1117] border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-slate-800">
          <div className="flex space-x-2">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${activeTab === tab.id ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              
                {tab.label}
              </button>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-md hover:bg-slate-800"
            aria-label="Copy code">
            
            {copied ?
            <Check size={14} className="text-green-400" /> :

            <Copy size={14} />
            }
          </button>
        </div>
        <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{
                opacity: 0,
                y: 5
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -5
              }}
              transition={{
                duration: 0.15
              }}>
              
              {tabs.find((t) => t.id === activeTab)?.code}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>);

}