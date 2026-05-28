import React, { useState } from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import {
  Copy,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Inbox } from
'lucide-react';
import { useApiKeys, useRollApiKey } from '../../hooks/usePeterPay';
import {
  SkeletonRows,
  ErrorState,
  EmptyState } from
'../../components/ui/States';
export function ApiKeys() {
  const [showSecret, setShowSecret] = useState(false);
  const { data: apiKeys, loading, error, refetch } = useApiKeys();
  const { mutate: rollKey, loading: rolling } = useRollApiKey();
  const liveKey = apiKeys?.find((k) => k.environment === 'live');
  const sandboxKey = apiKeys?.find((k) => k.environment === 'sandbox');
  const handleRoll = async (environment: 'live' | 'sandbox') => {
    if (
    window.confirm(
      `Are you sure you want to roll your ${environment} key? The old key will stop working immediately.`
    ))
    {
      await rollKey({
        environment
      });
      refetch();
    }
  };
  return (
    <div>
      <PageHeader
        title="API Keys"
        description="Manage your API keys for authenticating requests to PeterPay." />
      

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-amber-800">
            Keep your secret keys safe
          </h4>
          <p className="text-sm text-amber-700 mt-1">
            Do not share your secret keys in publicly accessible areas such as
            GitHub, client-side code, and so forth. If a key is compromised,
            roll it immediately.
          </p>
        </div>
      </div>

      {loading && <SkeletonRows rows={4} cols={1} />}

      {!loading && error && <ErrorState error={error} onRetry={refetch} />}

      {!loading && !error && !liveKey && !sandboxKey &&
      <EmptyState
        icon={<Inbox className="w-6 h-6" />}
        title="No API Keys Found"
        description="You don't have any API keys generated yet." />

      }

      {!loading && !error && (liveKey || sandboxKey) &&
      <div className="space-y-8">
          {/* Live Keys */}
          {liveKey &&
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <h3 className="font-semibold text-slate-900">
                    Live API Keys
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Public Key
                  </label>
                  <div className="flex">
                    <code className="flex-1 block px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-l-lg text-sm text-slate-600 font-mono">
                      {liveKey.public_key}
                    </code>
                    <button className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 rounded-r-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Used for client-side operations like PeterPay.js
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Secret Key
                  </label>
                  <div className="flex">
                    <code className="flex-1 block px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-l-lg text-sm text-slate-900 font-mono">
                      {showSecret ?
                  liveKey.secret_key_preview.replace('••••', 'REVEALED') // In a real app, you'd fetch the full key or only show it once
                  : liveKey.secret_key_preview}
                    </code>
                    <button
                  onClick={() => setShowSecret(!showSecret)}
                  className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                  
                      {showSecret ?
                  <EyeOff className="w-4 h-4" /> :

                  <Eye className="w-4 h-4" />
                  }
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 rounded-r-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Used for server-side API requests. Keep this secret.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                variant="outline"
                className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                onClick={() => handleRoll('live')}
                disabled={rolling}>
                
                    <RefreshCw
                  className={`w-4 h-4 ${rolling ? 'animate-spin' : ''}`} />
                
                    Roll Live Key
                  </Button>
                </div>
              </div>
            </div>
        }

          {/* Sandbox Keys */}
          {sandboxKey &&
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <h3 className="font-semibold text-slate-900">
                    Sandbox API Keys
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Public Key
                  </label>
                  <div className="flex">
                    <code className="flex-1 block px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-l-lg text-sm text-slate-600 font-mono">
                      {sandboxKey.public_key}
                    </code>
                    <button className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 rounded-r-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Secret Key
                  </label>
                  <div className="flex">
                    <code className="flex-1 block px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-l-lg text-sm text-slate-900 font-mono">
                      {sandboxKey.secret_key_preview}
                    </code>
                    <button className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-l-0 border-slate-200 rounded-r-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                variant="outline"
                className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                onClick={() => handleRoll('sandbox')}
                disabled={rolling}>
                
                    <RefreshCw
                  className={`w-4 h-4 ${rolling ? 'animate-spin' : ''}`} />
                
                    Roll Sandbox Key
                  </Button>
                </div>
              </div>
            </div>
        }
        </div>
      }
    </div>);

}