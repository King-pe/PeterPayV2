-- PostgreSQL Schema for PeterPayV2

-- Enums/Custom Types
CREATE TYPE currency_enum AS ENUM ('TZS', 'KES', 'UGX', 'RWF', 'USD');
CREATE TYPE country_enum AS ENUM ('TZ', 'KE', 'UG', 'RW', 'NG', 'GH');
CREATE TYPE merchant_status_enum AS ENUM ('active', 'suspended', 'frozen', 'inactive');
CREATE TYPE kyc_status_enum AS ENUM ('pending', 'submitted', 'verified', 'rejected');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'processing', 'success', 'failed', 'cancelled', 'expired', 'refunded');
CREATE TYPE payment_method_enum AS ENUM ('mpesa', 'airtel_money', 'tigo_pesa', 'halopesa', 'card', 'bank_transfer', 'qr', 'ussd');
CREATE TYPE payout_status_enum AS ENUM ('pending', 'processing', 'success', 'failed', 'reversed');
CREATE TYPE payout_recipient_type_enum AS ENUM ('mobile_money', 'bank', 'peterpay_wallet');
CREATE TYPE webhook_event_enum AS ENUM (
    'payment.created', 'payment.pending', 'payment.success', 'payment.failed', 'payment.cancelled', 'payment.expired',
    'payout.created', 'payout.processing', 'payout.success', 'payout.failed',
    'refund.created', 'refund.success',
    'settlement.paid',
    'dispute.opened'
);
CREATE TYPE environment_enum AS ENUM ('sandbox', 'live');
CREATE TYPE user_role_enum AS ENUM ('owner', 'admin', 'developer', 'support', 'super_admin');
CREATE TYPE ledger_entry_type_enum AS ENUM ('credit', 'debit');
CREATE TYPE kyc_document_type_enum AS ENUM ('business_license', 'tax_certificate', 'director_id', 'bank_proof');
CREATE TYPE settlement_status_enum AS ENUM ('pending', 'processing', 'success', 'failed');
CREATE TYPE payment_link_status_enum AS ENUM ('active', 'inactive', 'expired');
CREATE TYPE invoice_status_enum AS ENUM ('draft', 'sent', 'pending', 'paid', 'overdue', 'void');
CREATE TYPE report_type_enum AS ENUM ('volume', 'settlement', 'fee', 'audit');
CREATE TYPE dispute_status_enum AS ENUM ('open', 'won', 'lost', 'under_review');
CREATE TYPE risk_rule_action_enum AS ENUM ('block', 'flag', 'review');
CREATE TYPE risk_rule_status_enum AS ENUM ('active', 'inactive');
CREATE TYPE provider_type_enum AS ENUM ('mobile_money', 'card', 'bank');
CREATE TYPE provider_status_enum AS ENUM ('operational', 'degraded', 'down');

-- Tables

CREATE TABLE merchants (
    id VARCHAR(255) PRIMARY KEY,
    legal_name VARCHAR(255) NOT NULL,
    trading_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(255) NOT NULL,
    tin VARCHAR(255) NOT NULL,
    country country_enum NOT NULL,
    status merchant_status_enum NOT NULL,
    kyc_status kyc_status_enum NOT NULL,
    support_email VARCHAR(255) NOT NULL,
    support_phone VARCHAR(255) NOT NULL,
    monthly_volume NUMERIC(18, 2) NOT NULL,
    monthly_volume_currency currency_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role user_role_enum NOT NULL,
    merchant_id VARCHAR(255) REFERENCES merchants(id) ON DELETE SET NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE payments (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    reference VARCHAR(255) NOT NULL,
    amount NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    fee NUMERIC(18, 2) NOT NULL,
    net_amount NUMERIC(18, 2) NOT NULL,
    status payment_status_enum NOT NULL,
    method payment_method_enum,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    description TEXT,
    callback_url TEXT,
    redirect_url TEXT,
    checkout_url TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE payout_recipients (
    id SERIAL PRIMARY KEY,
    type payout_recipient_type_enum NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    network VARCHAR(255), -- mpesa, airtel, tigo, halopesa, mtn
    bank_code VARCHAR(255),
    account_number VARCHAR(255)
);

CREATE TABLE payouts (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    reference VARCHAR(255) NOT NULL,
    amount NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    fee NUMERIC(18, 2) NOT NULL,
    status payout_status_enum NOT NULL,
    recipient_id INTEGER NOT NULL REFERENCES payout_recipients(id) ON DELETE RESTRICT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE wallets (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) UNIQUE NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    currency currency_enum NOT NULL,
    available NUMERIC(18, 2) DEFAULT 0.00,
    pending NUMERIC(18, 2) DEFAULT 0.00,
    held NUMERIC(18, 2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_entries (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    type ledger_entry_type_enum NOT NULL,
    amount NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    running_balance NUMERIC(18, 2) NOT NULL,
    reference_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE webhook_endpoints (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    events webhook_event_enum[] NOT NULL,
    status VARCHAR(255) NOT NULL, -- 'active' | 'inactive'
    signing_secret VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE webhook_deliveries (
    id VARCHAR(255) PRIMARY KEY,
    endpoint_id VARCHAR(255) NOT NULL REFERENCES webhook_endpoints(id) ON DELETE CASCADE,
    event webhook_event_enum NOT NULL,
    http_status INTEGER,
    attempts INTEGER DEFAULT 0,
    delivered_at TIMESTAMP WITH TIME ZONE,
    next_retry_at TIMESTAMP WITH TIME ZONE,
    request_body TEXT,
    response_body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_keys (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    environment environment_enum NOT NULL,
    public_key VARCHAR(255) NOT NULL,
    secret_key_preview VARCHAR(255) NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kyc_applications (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    country country_enum NOT NULL,
    status kyc_status_enum NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by VARCHAR(255), -- Could be a user ID
    director_name VARCHAR(255) NOT NULL,
    director_id_number VARCHAR(255) NOT NULL,
    director_email VARCHAR(255) NOT NULL,
    director_phone VARCHAR(255) NOT NULL
);

CREATE TABLE kyc_documents (
    id VARCHAR(255) PRIMARY KEY,
    kyc_application_id VARCHAR(255) NOT NULL REFERENCES kyc_applications(id) ON DELETE CASCADE,
    type kyc_document_type_enum NOT NULL,
    url TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settlements (
    id VARCHAR(255) PRIMARY KEY,
    reference VARCHAR(255) NOT NULL,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    amount NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    fee NUMERIC(18, 2) NOT NULL,
    net_amount NUMERIC(18, 2) NOT NULL,
    status settlement_status_enum NOT NULL,
    destination_bank_name VARCHAR(255) NOT NULL,
    destination_account_number_masked VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE payment_links (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    amount NUMERIC(18, 2), -- null = customer chooses
    currency currency_enum NOT NULL,
    status payment_link_status_enum NOT NULL,
    url TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    payments INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    number VARCHAR(255) NOT NULL,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    subtotal NUMERIC(18, 2) NOT NULL,
    tax NUMERIC(18, 2) NOT NULL,
    total NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    status invoice_status_enum NOT NULL,
    due_at TIMESTAMP WITH TIME ZONE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE invoice_line_items (
    id SERIAL PRIMARY KEY,
    invoice_id VARCHAR(255) NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(18, 2) NOT NULL,
    amount NUMERIC(18, 2) NOT NULL
);

CREATE TABLE disputes (
    id VARCHAR(255) PRIMARY KEY,
    payment_id VARCHAR(255) NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status dispute_status_enum NOT NULL,
    amount NUMERIC(18, 2) NOT NULL,
    currency currency_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE risk_rules (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) REFERENCES merchants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    action risk_rule_action_enum NOT NULL,
    status risk_rule_status_enum NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE providers (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type provider_type_enum NOT NULL,
    status provider_status_enum NOT NULL,
    success_rate NUMERIC(5, 2) DEFAULT 100.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fee_rules (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) REFERENCES merchants(id) ON DELETE CASCADE,
    method VARCHAR(255) NOT NULL,
    percentage NUMERIC(5, 2) DEFAULT 0.00,
    fixed_amount NUMERIC(18, 2) DEFAULT 0.00,
    currency currency_enum NOT NULL,
    status VARCHAR(255) NOT NULL, -- 'active' | 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    id VARCHAR(255) PRIMARY KEY,
    merchant_id VARCHAR(255) NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type report_type_enum NOT NULL,
    status VARCHAR(255) NOT NULL, -- 'completed' | 'processing' | 'failed'
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id VARCHAR(255) PRIMARY KEY,
    admin_id VARCHAR(255) REFERENCES users(id) ON DELETE SET NULL,
    admin_name VARCHAR(255),
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    resource_id VARCHAR(255),
    ip_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_payments_merchant_id ON payments(merchant_id);
CREATE INDEX idx_payouts_merchant_id ON payouts(merchant_id);
CREATE INDEX idx_ledger_entries_merchant_id ON ledger_entries(merchant_id);
CREATE INDEX idx_webhook_endpoints_merchant_id ON webhook_endpoints(merchant_id);
CREATE INDEX idx_api_keys_merchant_id ON api_keys(merchant_id);
CREATE INDEX idx_kyc_applications_merchant_id ON kyc_applications(merchant_id);
CREATE INDEX idx_settlements_merchant_id ON settlements(merchant_id);
CREATE INDEX idx_payment_links_merchant_id ON payment_links(merchant_id);
CREATE INDEX idx_invoices_merchant_id ON invoices(merchant_id);
CREATE INDEX idx_disputes_payment_id ON disputes(payment_id);
CREATE INDEX idx_risk_rules_merchant_id ON risk_rules(merchant_id);
CREATE INDEX idx_fee_rules_merchant_id ON fee_rules(merchant_id);
CREATE INDEX idx_reports_merchant_id ON reports(merchant_id);
CREATE INDEX idx_audit_logs_admin_id ON audit_logs(admin_id);
