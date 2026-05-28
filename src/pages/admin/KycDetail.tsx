import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ExternalLink } from
'lucide-react';
import { toast } from 'sonner';
import {
  useKycApplication,
  useApproveKyc,
  useRejectKyc } from
'../../hooks/usePeterPay';
import { LoadingState, ErrorState } from '../../components/ui/States';
export function KycDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: application, loading, error, refetch } = useKycApplication(id);
  const { mutate: approveKyc, loading: approving } = useApproveKyc();
  const { mutate: rejectKyc, loading: rejecting } = useRejectKyc();
  if (loading) {
    return <LoadingState label="Loading KYC application..." />;
  }
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }
  if (!application) {
    return (
      <div className="text-center py-12 text-slate-500">
        Application not found.
      </div>);

  }
  const handleApprove = async () => {
    try {
      await approveKyc({
        application_id: application.id
      });
      toast.success('KYC Application Approved');
      navigate('/admin/kyc');
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve');
    }
  };
  const handleReject = async () => {
    const reason = window.prompt('Reason for rejection:');
    if (!reason) return;
    try {
      await rejectKyc({
        application_id: application.id,
        reason
      });
      toast.error('KYC Application Rejected');
      navigate('/admin/kyc');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject');
    }
  };
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin/kyc"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Review: {application.business_name}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Application ID: {application.id} • Submitted{' '}
            {new Date(application.submitted_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Data */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Business Information
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500">
                  Legal Business Name
                </div>
                <div className="font-medium text-slate-900">
                  {application.business_name}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Country</div>
                <div className="font-medium text-slate-900">
                  {application.country}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Merchant ID</div>
                <div className="font-medium text-slate-900">
                  {application.merchant_id}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Director Information
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500">Full Name</div>
                <div className="font-medium text-slate-900">
                  {application.director.name}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">
                  ID / Passport Number
                </div>
                <div className="font-medium text-slate-900">
                  {application.director.id_number}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Contact</div>
                <div className="font-medium text-slate-900">
                  {application.director.email} • {application.director.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Documents */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Uploaded Documents
            </h3>

            <div className="space-y-4">
              {application.documents.map((doc) =>
              <div
                key={doc.id}
                className="border border-slate-200 rounded-lg p-4">
                
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900 capitalize">
                        {doc.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-md">
                      
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                      href={doc.url}
                      download
                      className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-md">
                      
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="h-32 bg-slate-100 rounded-md flex items-center justify-center border border-slate-200 border-dashed">
                    <span className="text-sm text-slate-400">
                      Document Preview
                    </span>
                  </div>
                </div>
              )}

              {application.documents.length === 0 &&
              <div className="text-sm text-slate-500 text-center py-4">
                  No documents uploaded.
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      {application.status === 'pending' &&
      <div className="sticky bottom-6 bg-white p-4 rounded-xl border border-slate-200 shadow-lg flex items-center justify-between mt-8">
          <div className="text-sm text-slate-500">
            Please review all documents carefully before making a decision.
          </div>
          <div className="flex gap-3">
            <button
            onClick={handleReject}
            disabled={rejecting || approving}
            className="px-6 py-2.5 bg-white border border-red-200 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50">
            
              <XCircle className="w-5 h-5" />
              Reject Application
            </button>
            <button
            onClick={handleApprove}
            disabled={rejecting || approving}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50">
            
              <CheckCircle2 className="w-5 h-5" />
              Approve Application
            </button>
          </div>
        </div>
      }
    </div>);

}