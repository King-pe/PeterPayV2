import React, { useState } from 'react';
import { PageHeader } from '../../components/dashboard/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Building2, ShieldCheck, Users, BadgeCheck } from 'lucide-react';
import { useCurrentUser, useMerchant } from '../../hooks/usePeterPay';
import { SkeletonRows, ErrorState } from '../../components/ui/States';
export function Settings() {
  const [activeTab, setActiveTab] = useState('business');
  const {
    data: user,
    loading: userLoading,
    error: userError
  } = useCurrentUser();
  const {
    data: merchant,
    loading: merchantLoading,
    error: merchantError
  } = useMerchant(user?.merchant_id || undefined);
  const loading = userLoading || merchantLoading;
  const error = userError || merchantError;
  if (loading) {
    return (
      <div>
        <PageHeader
          title="Settings"
          description="Manage your business profile, team members, and security preferences." />
        
        <SkeletonRows rows={5} cols={1} />
      </div>);

  }
  if (error) {
    return (
      <div>
        <PageHeader
          title="Settings"
          description="Manage your business profile, team members, and security preferences." />
        
        <ErrorState error={error} />
      </div>);

  }
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your business profile, team members, and security preferences." />
      

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Nav */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('business')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'business' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              
              <Building2 className="w-4 h-4" />
              Business Profile
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'team' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              
              <Users className="w-4 h-4" />
              Team Members
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-brand-primary/5 text-brand-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              
              <ShieldCheck className="w-4 h-4" />
              Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'business' && merchant &&
          <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">
                    Business Details
                  </h3>
                  {merchant.kyc_status === 'verified' &&
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      KYC Approved
                    </div>
                }
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Legal Business Name
                      </label>
                      <input
                      type="text"
                      defaultValue={merchant.legal_name}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Trading Name
                      </label>
                      <input
                      type="text"
                      defaultValue={merchant.trading_name}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Registration Number
                      </label>
                      <input
                      type="text"
                      defaultValue={merchant.registration_number}
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        TIN (Tax Identification Number)
                      </label>
                      <input
                      type="text"
                      defaultValue={merchant.tin}
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" />
                    
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900">
                    Contact Information
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Support Email
                      </label>
                      <input
                      type="email"
                      defaultValue={merchant.support_email}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Support Phone
                      </label>
                      <input
                      type="tel"
                      defaultValue={merchant.support_phone}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                    
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'team' && user &&
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-slate-900">Team Members</h3>
                <Button size="sm">Invite Member</Button>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-medium">
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded capitalize">
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'security' &&
          <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900">
                    Two-Factor Authentication
                  </h3>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">
                      Authenticator App
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Use an app like Google Authenticator to secure your
                      account.
                    </p>
                  </div>
                  <Button variant="outline">
                    {user?.two_factor_enabled ? 'Manage 2FA' : 'Enable 2FA'}
                  </Button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900">
                    Change Password
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Password
                    </label>
                    <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Password
                    </label>
                    <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full max-w-md px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary" />
                  
                  </div>
                  <div className="pt-2">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}