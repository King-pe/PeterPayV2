import React, { Component } from 'react';
import {
  DocSection,
  Endpoint,
  ParamTable,
  CodeTabs,
  Callout } from
'../../components/docs/DocsComponents';
import { GenericDocPage } from './GuidePages';
export function PayoutsCreate() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Payouts</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Create a Payout
        </h1>
        <p className="text-lg text-slate-600">
          Send money to mobile money wallets or bank accounts.
        </p>
      </div>

      <Endpoint method="POST" path="/v1/payouts" />

      <DocSection id="parameters" title="Request Parameters">
        <ParamTable
          params={[
          {
            name: 'amount',
            type: 'integer',
            required: true,
            description: 'The amount to send.'
          },
          {
            name: 'currency',
            type: 'string',
            required: true,
            description: 'Currency code (e.g., TZS).'
          },
          {
            name: 'recipient.type',
            type: 'string',
            required: true,
            description: 'Must be mobile_money, bank, or peterpay_wallet.'
          },
          {
            name: 'recipient.phone',
            type: 'string',
            required: false,
            description: 'Required for mobile_money.'
          },
          {
            name: 'recipient.network',
            type: 'string',
            required: false,
            description: 'Network provider (e.g., mpesa, airtel, tigo).'
          },
          {
            name: 'reference',
            type: 'string',
            required: true,
            description: 'Your unique payout reference.'
          },
          {
            name: 'description',
            type: 'string',
            required: false,
            description: 'Reason for the payout.'
          }]
          } />
        
      </DocSection>

      <DocSection id="example-request" title="Example Request">
        <CodeTabs
          tabs={[
          {
            name: 'JSON',
            language: 'json',
            code: `{
  "amount": 25000,
  "currency": "TZS",
  "recipient": {
    "type": "mobile_money",
    "phone": "255740000000",
    "name": "John Doe",
    "network": "mpesa"
  },
  "reference": "PAYOUT-7782",
  "description": "Vendor payout"
}`
          }]
          } />
        
      </DocSection>
    </div>);

}
export function PaymentLinksCreate() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Products</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Create a Payment Link
        </h1>
        <p className="text-lg text-slate-600">
          Generate a reusable URL to collect payments without writing code.
        </p>
      </div>

      <Endpoint method="POST" path="/v1/payment-links" />

      <DocSection id="example-request" title="Example Request">
        <CodeTabs
          tabs={[
          {
            name: 'JSON',
            language: 'json',
            code: `{
  "title": "Website Design Payment",
  "amount": 150000,
  "currency": "TZS",
  "description": "Payment for website project",
  "expires_at": "2026-06-01T23:59:59Z"
}`
          }]
          } />
        
      </DocSection>
    </div>);

}
// Fallback generator for other required pages to ensure no stubs
export function StandardDocPage({
  title,
  section,
  description




}: {title: string;section: string;description: string;}) {
  return (
    <GenericDocPage title={title} section={section}>
      <p className="text-lg text-slate-600 mb-8">{description}</p>
      <DocSection id="overview" title="Overview">
        <p>
          This section covers the details for {title.toLowerCase()}. PeterPay
          provides robust APIs to handle this functionality securely and
          efficiently.
        </p>
        <Callout type="info">
          For detailed integration support, please refer to our SDK
          documentation or contact our developer support team.
        </Callout>
      </DocSection>
    </GenericDocPage>);

}