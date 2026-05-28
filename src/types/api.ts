// =============================================
// PeterPay API Types
// Mirror these in your backend (Prisma / Drizzle / TypeORM schemas).
// =============================================

// ---------- Shared ----------
export type Currency = 'TZS' | 'KES' | 'UGX' | 'RWF' | 'USD';
export type Country = 'TZ' | 'KE' | 'UG' | 'RW' | 'NG' | 'GH';
export type Environment = 'sandbox' | 'live';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ---------- Auth ----------
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'owner' | 'admin' | 'developer' | 'support' | 'super_admin';
  merchant_id: string | null;
  two_factor_enabled: boolean;
  created_at: string;
  last_login_at: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
  two_factor_code?: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  business_name: string;
  country: Country;
}

// ---------- Merchant ----------
export type MerchantStatus = 'active' | 'suspended' | 'frozen' | 'inactive';
export type KycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export interface Merchant {
  id: string;
  legal_name: string;
  trading_name: string;
  registration_number: string;
  tin: string;
  country: Country;
  status: MerchantStatus;
  kyc_status: KycStatus;
  support_email: string;
  support_phone: string;
  monthly_volume: number;
  monthly_volume_currency: Currency;
  created_at: string;
}

// ---------- Payment ----------
export type PaymentStatus =
'pending' |
'processing' |
'success' |
'failed' |
'cancelled' |
'expired' |
'refunded';

export type PaymentMethod =
'mpesa' |
'airtel_money' |
'tigo_pesa' |
'halopesa' |
'card' |
'bank_transfer' |
'qr' |
'ussd';

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: string; // e.g. pay_01HXYZ123
  reference: string;
  amount: number;
  currency: Currency;
  fee: number;
  net_amount: number;
  status: PaymentStatus;
  method: PaymentMethod | null;
  customer: Customer;
  description: string | null;
  callback_url: string | null;
  redirect_url: string | null;
  checkout_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  paid_at: string | null;
}

export interface CreatePaymentRequest {
  amount: number;
  currency: Currency;
  reference: string;
  customer: Customer;
  callback_url?: string;
  redirect_url?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

// ---------- Payout ----------
export type PayoutStatus =
'pending' |
'processing' |
'success' |
'failed' |
'reversed';

export type PayoutRecipientType = 'mobile_money' | 'bank' | 'peterpay_wallet';

export interface PayoutRecipient {
  type: PayoutRecipientType;
  name: string;
  phone?: string;
  network?: 'mpesa' | 'airtel' | 'tigo' | 'halopesa' | 'mtn';
  bank_code?: string;
  account_number?: string;
}

export interface Payout {
  id: string;
  reference: string;
  amount: number;
  currency: Currency;
  fee: number;
  status: PayoutStatus;
  recipient: PayoutRecipient;
  description: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface CreatePayoutRequest {
  amount: number;
  currency: Currency;
  reference: string;
  recipient: PayoutRecipient;
  description?: string;
}

// ---------- Wallet & Ledger ----------
export interface WalletBalance {
  currency: Currency;
  available: number;
  pending: number;
  held: number;
}

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: Currency;
  running_balance: number;
  reference_id: string | null;
}

// ---------- Webhooks ----------
export type WebhookEvent =
'payment.created' |
'payment.pending' |
'payment.success' |
'payment.failed' |
'payment.cancelled' |
'payment.expired' |
'payout.created' |
'payout.processing' |
'payout.success' |
'payout.failed' |
'refund.created' |
'refund.success' |
'settlement.paid' |
'dispute.opened';

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: WebhookEvent[] | ['*'];
  status: 'active' | 'inactive';
  signing_secret: string;
  created_at: string;
}

export interface WebhookDelivery {
  id: string;
  endpoint_id: string;
  event: WebhookEvent;
  http_status: number;
  attempts: number;
  delivered_at: string | null;
  next_retry_at: string | null;
  request_body: string;
  response_body: string | null;
}

// ---------- API Keys ----------
export interface ApiKey {
  id: string;
  environment: Environment;
  public_key: string; // visible
  secret_key_preview: string; // e.g. "sk_live_••••29f82h3f"
  last_used_at: string | null;
  created_at: string;
}

// ---------- KYC ----------
export interface KycApplication {
  id: string;
  merchant_id: string;
  business_name: string;
  country: Country;
  status: KycStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  documents: KycDocument[];
  director: {
    name: string;
    id_number: string;
    email: string;
    phone: string;
  };
}

export interface KycDocument {
  id: string;
  type: 'business_license' | 'tax_certificate' | 'director_id' | 'bank_proof';
  url: string;
  verified: boolean;
}

// ---------- Settlements ----------
export interface Settlement {
  id: string;
  reference: string;
  merchant_id: string;
  amount: number;
  currency: Currency;
  fee: number;
  net_amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  destination: {
    bank_name: string;
    account_number_masked: string;
  };
  created_at: string;
  completed_at: string | null;
}

// ---------- Payment Links ----------
export interface PaymentLink {
  id: string;
  title: string;
  description: string | null;
  amount: number | null; // null = customer chooses
  currency: Currency;
  status: 'active' | 'inactive' | 'expired';
  url: string;
  views: number;
  payments: number;
  expires_at: string | null;
  created_at: string;
}

// ---------- Invoices ----------
export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  customer: Customer;
  line_items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: Currency;
  status: 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'void';
  due_at: string;
  issued_at: string;
  paid_at: string | null;
}

// ---------- Dashboard ----------
export interface DashboardStats {
  gross_volume: number;
  net_revenue: number;
  active_customers: number;
  success_rate: number;
  volume_chart: {date: string;volume: number;}[];
  method_breakdown: {method: string;percentage: number;}[];
}

export interface AdminStats {
  kyc_pending: number;
  open_disputes: number;
  high_risk_txns: number;
  failed_webhooks: number;
  pending_settlements: number;
  total_gross_volume_24h: number;
  volume_change_24h: number;
  active_merchants_today: number;
  merchants_change: number;
  total_txns_24h: number;
  txns_change_24h: number;
  system_uptime: number;
  volume_chart: {date: string;volume: number;}[];
  method_breakdown: {name: string;success: number;failed: number;}[];
  providers: {name: string;status: 'operational' | 'degraded' | 'down';}[];
}

// ---------- Admin List Pages ----------
export interface Dispute {
  id: string;
  payment_id: string;
  reason: string;
  status: 'open' | 'won' | 'lost' | 'under_review';
  amount: number;
  currency: Currency;
  created_at: string;
}

export interface RiskRule {
  id: string;
  name: string;
  description: string;
  action: 'block' | 'flag' | 'review';
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Provider {
  id: string;
  name: string;
  type: 'mobile_money' | 'card' | 'bank';
  status: 'operational' | 'degraded' | 'down';
  success_rate: number;
  updated_at: string;
}

export interface FeeRule {
  id: string;
  method: string;
  percentage: number;
  fixed_amount: number;
  currency: Currency;
  status: 'active' | 'inactive';
}

export interface Report {
  id: string;
  name: string;
  type: 'volume' | 'settlement' | 'fee' | 'audit';
  status: 'completed' | 'processing' | 'failed';
  url: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  resource: string;
  resource_id: string;
  ip_address: string;
  created_at: string;
}