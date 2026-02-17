import React from "react";
import { CMSContent, CMSSection } from "@/components/cms/CMSContent";

const termsOfUseSections: CMSSection[] = [
  {
    title: "Terms & Conditions",
    content: "Last updated: February 7, 2026",
  },
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.",
  },
  {
    title: "Use License",
    items: [
      "Permission is granted to temporarily use the application for personal, non-commercial use only",
      "This license does not include the right to modify, copy, or reproduce the application",
      "This license shall automatically terminate if you violate any of these restrictions",
    ],
  },
  {
    title: "Medical Disclaimer",
    content:
      "The information provided by this application is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
  },
  {
    title: "User Responsibilities",
    items: [
      "Provide accurate and complete information",
      "Maintain the security of your account credentials",
      "Not use the service for any unlawful purpose",
      "Not share your account with others",
      "Comply with all applicable laws and regulations",
    ],
  },
  {
    title: "Account Termination",
    content:
      "We reserve the right to terminate or suspend your account at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
  },
  {
    title: "Limitations of Liability",
    content:
      "In no event shall the company, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
  },
  {
    title: "Intellectual Property",
    content:
      "The service and its original content, features, and functionality are and will remain the exclusive property of the company and its licensors. The service is protected by copyright, trademark, and other laws.",
  },
  {
    title: "Prohibited Activities",
    items: [
      "Attempting to bypass any security features",
      "Uploading viruses or malicious code",
      "Attempting to gain unauthorized access to other user accounts",
      "Using the service to transmit spam or unsolicited messages",
      "Reverse engineering or decompiling any part of the service",
    ],
  },
  {
    title: "Subscription and Payments",
    content:
      "Some parts of the service may be billed on a subscription basis. You will be billed in advance on a recurring basis. At the end of each billing period, your subscription will automatically renew unless you cancel it or we cancel it.",
  },
  {
    title: "Refund Policy",
    content:
      "All purchases are final and non-refundable unless otherwise stated or required by law. If you have concerns about a purchase, please contact our support team.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is registered, without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions about these Terms, please contact us at support@routine-app.com or through the in-app support feature.",
  },
];

export default function TermsOfUseScreen() {
  return (
    <CMSContent
      title="Terms of Use"
      sections={termsOfUseSections}
    />
  );
}
