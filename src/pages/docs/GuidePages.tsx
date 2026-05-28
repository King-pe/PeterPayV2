import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  DocSection,
  Callout,
  CodeTabs } from
'../../components/docs/DocsComponents';
export function Quickstart() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">
          Getting Started
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Quickstart
        </h1>
        <p className="text-lg text-slate-600">
          Integrate PeterPay into your application in under 5 minutes.
        </p>
      </div>

      <DocSection id="step-1" title="1. Create an account">
        <p>
          Before you can start building, you need a PeterPay account.{' '}
          <Link to="/register">Sign up for free</Link> to get access to the
          sandbox environment immediately.
        </p>
      </DocSection>

      <DocSection id="step-2" title="2. Get your API keys">
        <p>
          Go to the <strong>Developers &gt; API Keys</strong> section in your
          dashboard. You will see two sets of keys:
        </p>
        <ul>
          <li>
            <strong>Sandbox Keys:</strong> Use these for testing. No real money
            is moved.
          </li>
          <li>
            <strong>Live Keys:</strong> Use these in production. Requires KYC
            approval.
          </li>
        </ul>
        <Callout type="warning" title="Keep your secret keys safe">
          Never commit your secret keys to GitHub or expose them in client-side
          code (like React or Vue). Always make API calls from your backend
          server.
        </Callout>
      </DocSection>

      <DocSection id="step-3" title="3. Make your first payment request">
        <p>
          Use your sandbox secret key to create a payment request. This will
          return a <code>checkout_url</code> that you can redirect your customer
          to.
        </p>
        <CodeTabs
          tabs={[
          {
            name: 'cURL',
            language: 'bash',
            code: `curl -X POST https://api.peterpay.com/v1/payments \\
  -H "Authorization: Bearer PETERPAY_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 50000,
    "currency": "TZS",
    "reference": "TEST-ORDER-001",
    "customer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "255740000000"
    },
    "redirect_url": "https://your-site.com/success"
  }'`
          }]
          } />
        
      </DocSection>

      <DocSection id="step-4" title="4. Set up webhooks">
        <p>
          To know when a payment is successful, you should listen for webhooks.
          Configure your webhook endpoint in the dashboard and listen for the{' '}
          <code>payment.success</code> event.
        </p>
        <Link
          to="/docs/webhooks/overview"
          className="inline-flex items-center text-blue-600 font-medium hover:underline">
          
          Learn about webhooks &rarr;
        </Link>
      </DocSection>
    </div>);

}
export function Authentication() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">
          Getting Started
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Authentication
        </h1>
        <p className="text-lg text-slate-600">
          Learn how to authenticate your API requests securely.
        </p>
      </div>

      <DocSection id="overview" title="Overview">
        <p>
          The PeterPay API uses Bearer tokens for authentication. You must
          include your Secret Key in the <code>Authorization</code> header of
          every request.
        </p>

        <Callout type="info">
          All API requests must be made over HTTPS. Calls made over plain HTTP
          will fail. API requests without authentication will also fail.
        </Callout>

        <CodeTabs
          tabs={[
          {
            name: 'Header Format',
            language: 'http',
            code: `Authorization: Bearer PETERPAY_SECRET_KEY`
          }]
          } />
        
      </DocSection>

      <DocSection id="environments" title="Environments">
        <p>
          We provide two environments: Sandbox and Live. Your API keys determine
          which environment you are interacting with.
        </p>
        <ul>
          <li>
            Keys starting with <code>sk_test_</code> interact with the Sandbox.
          </li>
          <li>
            Keys starting with <code>sk_live_</code> interact with the Live
            environment.
          </li>
        </ul>
      </DocSection>
    </div>);

}
export function GenericDocPage({
  title,
  section,
  children




}: {title: string;section: string;children: React.ReactNode;}) {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <div className="text-sm font-medium text-blue-600 mb-2">{section}</div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
      </div>
      {children}
    </div>);

}