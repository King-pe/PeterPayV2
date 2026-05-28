// Domain-specific hooks wrapping endpoints.
// All paths are PeterPay v1 — your backend should implement these or change paths here.

import { useQuery, useMutation } from './useApi';
import { api } from '../lib/apiClient';
import type {
  Payment,
  Payout,
  Merchant,
  KycApplication,
  WalletBalance,
  LedgerEntry,
  WebhookEndpoint,
  WebhookDelivery,
  ApiKey,
  Settlement,
  PaymentLink,
  Invoice,
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  CreatePaymentRequest,
  CreatePayoutRequest,
  PaginatedResponse,
  PaymentStatus,
  PayoutStatus,
  DashboardStats,
  AdminStats,
  Dispute,
  RiskRule,
  Provider,
  FeeRule,
  Report,
  AuditLog } from
'../types/api';

// ---------- Auth ----------
export function useLogin() {
  return useMutation<LoginRequest, LoginResponse>((req) =>
  api.post<LoginResponse>('/auth/login', req, { skipAuth: true })
  );
}

export function useRegister() {
  return useMutation<RegisterRequest, LoginResponse>((req) =>
  api.post<LoginResponse>('/auth/register', req, { skipAuth: true })
  );
}

export function useCurrentUser(enabled = true) {
  return useQuery<User>(['me'], () => api.get<User>('/me'), { enabled });
}

// ---------- Payments ----------
interface PaymentListParams {
  page?: number;
  per_page?: number;
  status?: PaymentStatus;
  search?: string;
}

export function usePayments(params: PaymentListParams = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  if (params.status) qs.set('status', params.status);
  if (params.search) qs.set('search', params.search);
  const query = qs.toString();

  return useQuery<PaginatedResponse<Payment>>(
    ['payments', params.page, params.per_page, params.status, params.search],
    () =>
    api.get<PaginatedResponse<Payment>>(
      `/payments${query ? `?${query}` : ''}`
    )
  );
}

export function usePayment(id: string | undefined) {
  return useQuery<Payment>(
    ['payment', id],
    () => api.get<Payment>(`/payments/${id}`),
    { enabled: !!id }
  );
}

export function useCreatePayment() {
  return useMutation<CreatePaymentRequest, Payment>((req) =>
  api.post<Payment>('/payments', req)
  );
}

export function useRefundPayment() {
  return useMutation<
    {payment_id: string;amount?: number;reason?: string;},
    Payment>(
    ({ payment_id, ...body }) =>
    api.post<Payment>(`/payments/${payment_id}/refund`, body)
  );
}

// ---------- Payouts ----------
interface PayoutListParams {
  page?: number;
  per_page?: number;
  status?: PayoutStatus;
}

export function usePayouts(params: PayoutListParams = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  if (params.status) qs.set('status', params.status);
  const query = qs.toString();

  return useQuery<PaginatedResponse<Payout>>(
    ['payouts', params.page, params.per_page, params.status],
    () =>
    api.get<PaginatedResponse<Payout>>(`/payouts${query ? `?${query}` : ''}`)
  );
}

export function useCreatePayout() {
  return useMutation<CreatePayoutRequest, Payout>((req) =>
  api.post<Payout>('/payouts', req)
  );
}

// ---------- Wallet ----------
export function useWalletBalances() {
  return useQuery<WalletBalance[]>(['wallet', 'balances'], () =>
  api.get<WalletBalance[]>('/wallet/balances')
  );
}

export function useLedgerEntries(
params: {page?: number;per_page?: number;} = {})
{
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<LedgerEntry>>(
    ['ledger', params.page, params.per_page],
    () =>
    api.get<PaginatedResponse<LedgerEntry>>(
      `/wallet/ledger${query ? `?${query}` : ''}`
    )
  );
}

// ---------- Webhooks ----------
export function useWebhookEndpoints() {
  return useQuery<WebhookEndpoint[]>(['webhooks', 'endpoints'], () =>
  api.get<WebhookEndpoint[]>('/webhooks/endpoints')
  );
}

export function useWebhookDeliveries() {
  return useQuery<PaginatedResponse<WebhookDelivery>>(
    ['webhooks', 'deliveries'],
    () => api.get<PaginatedResponse<WebhookDelivery>>('/webhooks/deliveries')
  );
}

// ---------- API Keys ----------
export function useApiKeys() {
  return useQuery<ApiKey[]>(['api-keys'], () => api.get<ApiKey[]>('/api-keys'));
}

export function useRollApiKey() {
  return useMutation<{environment: 'sandbox' | 'live';}, ApiKey>(
    ({ environment }) => api.post<ApiKey>(`/api-keys/${environment}/roll`)
  );
}

// ---------- Settlements ----------
export function useSettlements() {
  return useQuery<PaginatedResponse<Settlement>>(['settlements'], () =>
  api.get<PaginatedResponse<Settlement>>('/settlements')
  );
}

// ---------- Payment Links ----------
export function usePaymentLinks() {
  return useQuery<PaginatedResponse<PaymentLink>>(['payment-links'], () =>
  api.get<PaginatedResponse<PaymentLink>>('/payment-links')
  );
}

// ---------- Invoices ----------
export function useInvoices() {
  return useQuery<PaginatedResponse<Invoice>>(['invoices'], () =>
  api.get<PaginatedResponse<Invoice>>('/invoices')
  );
}

// ---------- Admin: Merchants ----------
export function useMerchants(params: {page?: number;status?: string;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.status) qs.set('status', params.status);
  const query = qs.toString();
  return useQuery<PaginatedResponse<Merchant>>(
    ['admin', 'merchants', params.page, params.status],
    () =>
    api.get<PaginatedResponse<Merchant>>(
      `/admin/merchants${query ? `?${query}` : ''}`
    )
  );
}

export function useMerchant(id: string | undefined) {
  return useQuery<Merchant>(
    ['admin', 'merchant', id],
    () => api.get<Merchant>(`/admin/merchants/${id}`),
    { enabled: !!id }
  );
}

export function useSuspendMerchant() {
  return useMutation<{merchant_id: string;reason: string;}, Merchant>(
    ({ merchant_id, ...body }) =>
    api.post<Merchant>(`/admin/merchants/${merchant_id}/suspend`, body)
  );
}

// ---------- Admin: KYC ----------
export function useKycQueue() {
  return useQuery<PaginatedResponse<KycApplication>>(
    ['admin', 'kyc', 'queue'],
    () =>
    api.get<PaginatedResponse<KycApplication>>('/admin/kyc?status=pending')
  );
}

export function useKycApplication(id: string | undefined) {
  return useQuery<KycApplication>(
    ['admin', 'kyc', id],
    () => api.get<KycApplication>(`/admin/kyc/${id}`),
    { enabled: !!id }
  );
}

export function useApproveKyc() {
  return useMutation<{application_id: string;}, KycApplication>(
    ({ application_id }) =>
    api.post<KycApplication>(`/admin/kyc/${application_id}/approve`)
  );
}

export function useRejectKyc() {
  return useMutation<
    {application_id: string;reason: string;},
    KycApplication>(
    ({ application_id, ...body }) =>
    api.post<KycApplication>(`/admin/kyc/${application_id}/reject`, body)
  );
}

// ---------- Dashboard ----------
export function useDashboardStats() {
  return useQuery<DashboardStats>(['dashboard', 'stats'], () =>
  api.get<DashboardStats>('/dashboard/stats')
  );
}

export function useAdminStats() {
  return useQuery<AdminStats>(['admin', 'stats'], () =>
  api.get<AdminStats>('/admin/stats')
  );
}

// ---------- Admin List Pages ----------
export function useAdminUsers(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<User>>(
    ['admin', 'users', params.page],
    () =>
    api.get<PaginatedResponse<User>>(
      `/admin/users${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminTransactions(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Payment>>(
    ['admin', 'transactions', params.page],
    () =>
    api.get<PaginatedResponse<Payment>>(
      `/admin/transactions${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminPayments(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Payment>>(
    ['admin', 'payments', params.page],
    () =>
    api.get<PaginatedResponse<Payment>>(
      `/admin/payments${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminPayouts(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Payout>>(
    ['admin', 'payouts', params.page],
    () =>
    api.get<PaginatedResponse<Payout>>(
      `/admin/payouts${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminSettlements(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Settlement>>(
    ['admin', 'settlements', params.page],
    () =>
    api.get<PaginatedResponse<Settlement>>(
      `/admin/settlements${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminDisputes(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Dispute>>(
    ['admin', 'disputes', params.page],
    () =>
    api.get<PaginatedResponse<Dispute>>(
      `/admin/disputes${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminRisk(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<RiskRule>>(
    ['admin', 'risk', params.page],
    () =>
    api.get<PaginatedResponse<RiskRule>>(
      `/admin/risk${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminWebhooks(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<WebhookDelivery>>(
    ['admin', 'webhooks', params.page],
    () =>
    api.get<PaginatedResponse<WebhookDelivery>>(
      `/admin/webhooks${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminProviders(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Provider>>(
    ['admin', 'providers', params.page],
    () =>
    api.get<PaginatedResponse<Provider>>(
      `/admin/providers${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminFees(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<FeeRule>>(
    ['admin', 'fees', params.page],
    () =>
    api.get<PaginatedResponse<FeeRule>>(
      `/admin/fees${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminReports(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<Report>>(
    ['admin', 'reports', params.page],
    () =>
    api.get<PaginatedResponse<Report>>(
      `/admin/reports${query ? `?${query}` : ''}`
    )
  );
}

export function useAdminAuditLogs(params: {page?: number;} = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  const query = qs.toString();
  return useQuery<PaginatedResponse<AuditLog>>(
    ['admin', 'audit-logs', params.page],
    () =>
    api.get<PaginatedResponse<AuditLog>>(
      `/admin/audit-logs${query ? `?${query}` : ''}`
    )
  );
}