import React, { Component } from 'react';
import {
  DocSection,
  Endpoint,
  ParamTable,
  CodeTabs,
  Callout } from
'../../components/docs/DocsComponents';
export function PaymentsCreate() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Payments</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Create a Payment
        </h1>
        <p className="text-lg text-slate-600">
          Initialize a new payment session and get a checkout URL.
        </p>
      </div>

      <Endpoint method="POST" path="/v1/payments" />

      <DocSection id="parameters" title="Request Parameters">
        <ParamTable
          params={[
          {
            name: 'amount',
            type: 'integer',
            required: true,
            description:
            'The amount to charge the customer. Must be a positive integer.'
          },
          {
            name: 'currency',
            type: 'string',
            required: true,
            description:
            'The 3-letter ISO currency code (e.g., TZS, KES, USD).'
          },
          {
            name: 'reference',
            type: 'string',
            required: true,
            description:
            'Your unique order reference. Must be unique per payment.'
          },
          {
            name: 'customer.name',
            type: 'string',
            required: true,
            description: 'The full name of the customer.'
          },
          {
            name: 'customer.email',
            type: 'string',
            required: true,
            description: 'The email address of the customer.'
          },
          {
            name: 'customer.phone',
            type: 'string',
            required: true,
            description:
            'The phone number of the customer in international format (e.g., 255740000000).'
          },
          {
            name: 'callback_url',
            type: 'string',
            required: false,
            description:
            'Webhook URL to receive status updates for this specific payment.'
          },
          {
            name: 'redirect_url',
            type: 'string',
            required: false,
            description:
            'URL to redirect the customer to after payment completion.'
          },
          {
            name: 'description',
            type: 'string',
            required: false,
            description: 'A description of the payment.'
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
  "amount": 50000,
  "currency": "TZS",
  "reference": "ORDER-1001",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "255740000000"
  },
  "callback_url": "https://your-site.com/webhook",
  "redirect_url": "https://your-site.com/success",
  "description": "Payment for order 1001"
}`
          }]
          } />
        
      </DocSection>

      <DocSection id="example-response" title="Example Response">
        <p>
          A successful request returns a payment object with a{' '}
          <code>checkout_url</code>. Redirect your customer to this URL to
          complete the payment.
        </p>
        <CodeTabs
          tabs={[
          {
            name: '200 OK',
            language: 'json',
            code: `{
  "success": true,
  "data": {
    "payment_id": "pay_01HXYZ123",
    "reference": "ORDER-1001",
    "amount": 50000,
    "currency": "TZS",
    "status": "pending",
    "checkout_url": "https://checkout.peterpay.com/pay_01HXYZ123"
  }
}`
          }]
          } />
        
      </DocSection>
    </div>);

}
export function PaymentsVerify() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Payments</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Verify a Payment
        </h1>
        <p className="text-lg text-slate-600">
          Retrieve the details and status of an existing payment.
        </p>
      </div>

      <Endpoint method="GET" path="/v1/payments/{payment_id}" />

      <Callout type="info">
        While you can poll this endpoint to check payment status, we strongly
        recommend using{' '}
        <a href="/docs/webhooks/overview" className="underline">
          Webhooks
        </a>{' '}
        for real-time updates.
      </Callout>

      <DocSection id="parameters" title="Path Parameters">
        <ParamTable
          params={[
          {
            name: 'payment_id',
            type: 'string',
            required: true,
            description:
            'The unique PeterPay identifier for the payment (starts with pay_).'
          }]
          } />
        
      </DocSection>

      <DocSection id="example-response" title="Example Response">
        <CodeTabs
          tabs={[
          {
            name: '200 OK',
            language: 'json',
            code: `{
  "success": true,
  "data": {
    "payment_id": "pay_01HXYZ123",
    "reference": "ORDER-1001",
    "status": "success",
    "amount": 50000,
    "fee": 1250,
    "net_amount": 48750,
    "paid_at": "2026-05-24T10:30:00Z"
  }
}`
          }]
          } />
        
      </DocSection>
    </div>);

}