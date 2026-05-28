import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Activity,
  FileText,
  History,
  Lock } from
'lucide-react';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { useMerchant, useSuspendMerchant } from '../../hooks/usePeterPay';
import { LoadingState, ErrorState } from '../../components/ui/States';
const tabs = [
{
  id: 'overview',
  label: 'Overview',
  icon: Building2
},
{
  id: 'kyc',
  label: 'KYC & Docs',
  icon: FileText
},
{
  id: 'wallets',
  label: 'Wallets',
  icon: Wallet
},
{
  id: 'transactions',
  label: 'Transactions',
  icon: Activity
},
{
  id: 'audit',
  label: 'Audit Log',
  icon: History
}];

export function MerchantDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { data: merchant, loading, error, refetch } = useMerchant(id);
  const { mutate: suspendMerchant, loading: suspending } = useSuspendMerchant();
  if (loading) {
    return <LoadingState label="Loading merchant details..." />;
  }
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }
  if (!merchant) {
    return (
      <div className="text-center py-12 text-slate-500">
        Merchant not found.
      </div>);

  }
  const handleSuspend = async () => {
    if (window.confirm('Are you sure you want to suspend this merchant?')) {
      await suspendMerchant({
        merchant_id: merchant.id,
        reason: 'Admin action'
      });
      refetch();
    }
  };
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin/merchants"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {merchant.trading_name || merchant.legal_name}
            </h1>
            <StatusBadge status={merchant.status} />
            {merchant.kyc_status === 'verified' &&
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                KYC Verified
              </span>
            }
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Merchant ID: {merchant.id} • Joined{' '}
            {new Date(merchant.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Reset Password
          </button>
          <button className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Freeze Wallet
          </button>
          <button
            onClick={handleSuspend}
            disabled={suspending || merchant.status === 'suspended'}
            className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-700 hover:bg-red-100 transition-colors flex items-center gap-2 disabled:opacity-50">
            
            <ShieldAlert className="w-4 h-4" />
            {merchant.status === 'suspended' ? 'Suspended' : 'Suspend Account'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
                flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}>
            
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' &&
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Business Details
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      Legal Name
                    </div>
                    <div className="font-medium text-slate-900">
                      {merchant.legal_name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      Registration Number
                    </div>
                    <div className="font-medium text-slate-900">
                      {merchant.registration_number}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">TIN</div>
                    <div className="font-medium text-slate-900">
                      {merchant.tin}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Country</div>
                    <div className="font-medium text-slate-900">
                      {merchant.country}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Recent Alerts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-amber-800">
                        High Refund Rate Detected
                      </div>
                      <div className="text-xs text-amber-700 mt-1">
                        Refund rate exceeded 5% in the last 24 hours. Automated
                        review triggered.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {merchant.support_email}
                      </div>
                      <div className="text-xs text-slate-500">
                        Primary Email
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {merchant.support_phone}
                      </div>
                      <div className="text-xs text-slate-500">
                        Primary Phone
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        Registered Address
                      </div>
                      <div className="text-xs text-slate-500">
                        {merchant.country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Key Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      30-Day Volume
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {merchant.monthly_volume_currency}{' '}
                      {merchant.monthly_volume.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      Total Transactions
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      1,248
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      Dispute Rate
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      0.02%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {activeTab !== 'overview' &&
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {tabs.find((t) => t.id === activeTab)?.label} Module
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              This section contains detailed {activeTab} information for this
              merchant.
            </p>
          </div>
        }
      </div>
    </div>);

}