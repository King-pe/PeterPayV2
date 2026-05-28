import React, { Component } from 'react';
import {
  DocSection,
  CodeTabs,
  Callout,
  ParamTable } from
'../../components/docs/DocsComponents';
export function WebhooksOverview() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Webhooks</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Webhooks Overview
        </h1>
        <p className="text-lg text-slate-600">
          Listen for real-time events on your PeterPay account.
        </p>
      </div>

      <DocSection id="what-are-webhooks" title="What are Webhooks?">
        <p>
          Webhooks allow PeterPay to notify your application when an event
          occurs, such as a successful payment or a failed payout. Instead of
          polling our API, we send an HTTP POST request to your server with the
          event details.
        </p>

        <Callout type="success" title="Best Practice">
          Always rely on webhooks to fulfill orders or update balances, rather
          than relying on the customer returning to the{' '}
          <code>redirect_url</code>.
        </Callout>
      </DocSection>

      <DocSection id="events" title="Available Events">
        <p>You can subscribe to the following events:</p>
        <ul className="space-y-2 mt-4 font-mono text-sm">
          <li>
            <span className="text-indigo-600 font-bold">payment.created</span> -
            A payment session was initialized
          </li>
          <li>
            <span className="text-indigo-600 font-bold">payment.success</span> -
            A payment was successfully completed
          </li>
          <li>
            <span className="text-indigo-600 font-bold">payment.failed</span> -
            A payment attempt failed
          </li>
          <li>
            <span className="text-indigo-600 font-bold">payout.success</span> -
            Funds were successfully disbursed
          </li>
          <li>
            <span className="text-indigo-600 font-bold">refund.success</span> -
            A refund was processed
          </li>
          <li>
            <span className="text-indigo-600 font-bold">settlement.paid</span> -
            A settlement was paid to your bank account
          </li>
        </ul>
      </DocSection>

      <DocSection id="example-payload" title="Example Payload">
        <p>
          When an event occurs, we send a JSON payload to your configured
          endpoint:
        </p>
        <CodeTabs
          tabs={[
          {
            name: 'payment.success',
            language: 'json',
            code: `{
  "event": "payment.success",
  "data": {
    "payment_id": "pay_01HXYZ123",
    "reference": "ORDER-1001",
    "amount": 50000,
    "currency": "TZS",
    "status": "success",
    "paid_at": "2026-05-24T10:30:00Z"
  }
}`
          }]
          } />
        
      </DocSection>
    </div>);

}
export function WebhooksSignatures() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">Webhooks</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Verifying Signatures
        </h1>
        <p className="text-lg text-slate-600">
          Ensure webhook requests are actually coming from PeterPay.
        </p>
      </div>

      <DocSection id="overview" title="Overview">
        <p>
          To prevent malicious actors from sending fake webhook events to your
          server, PeterPay signs every webhook request. You should verify this
          signature before processing the payload.
        </p>

        <p>
          The signature is included in the <code>X-PeterPay-Signature</code>{' '}
          header.
        </p>

        <CodeTabs
          tabs={[
          {
            name: 'Headers',
            language: 'http',
            code: `POST /webhook HTTP/1.1
Host: your-site.com
Content-Type: application/json
X-PeterPay-Signature: sha256=a1b2c3d4e5f6...
X-PeterPay-Timestamp: 1710000000`
          }]
          } />
        
      </DocSection>

      <DocSection id="verification" title="How to Verify">
        <p>To verify the signature:</p>
        <ol className="list-decimal pl-5 space-y-2 mt-4">
          <li>Extract the timestamp and signature from the headers.</li>
          <li>
            Concatenate the timestamp and the raw request body (e.g.,{' '}
            <code>timestamp + "." + raw_body</code>).
          </li>
          <li>
            Compute an HMAC with the SHA256 hash function using your Webhook
            Secret.
          </li>
          <li>
            Compare your computed signature with the signature in the header.
          </li>
        </ol>
      </DocSection>
    </div>);

}