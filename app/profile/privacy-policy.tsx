import React from "react";
import { CMSContent, CMSSection } from "@/components/cms/CMSContent";

const privacyPolicySections: CMSSection[] = [
  {
    title: "Privacy & Data Protection",
    content: "Your privacy is important to us",
  },
  {
    title: "What data we collect",
    items: [
      "Face scan images",
      "Skin analysis results",
      "Treatment & routine data",
      "Lab test reports",
      "Profile information",
    ],
  },
  {
    title: "Why we use your data",
    items: [
      "Personalized skin analysis",
      "Treatment planning",
      "Progress tracking",
      "Medical safety",
    ],
  },
  {
    title: "How your data is protected",
    items: [
      "🔒 Encrypted & securely stored",
      "❌ Never sold to third parties",
    ],
  },
  {
    title: "Your rights",
    items: [
      "View & download your data",
      "Request correction or deletion",
    ],
  },
  {
    title: "Data Retention",
    content:
      "We retain your personal data for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time through your account settings.",
  },
  {
    title: "Third-Party Services",
    content:
      "We may use third-party service providers to help us operate our application. These providers have access to your data only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your device to refuse all cookies or to indicate when a cookie is being sent.",
  },
  {
    title: "Children's Privacy",
    content:
      "Our service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with personal data, please contact us.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'effective date' at the top of this policy.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy, please contact us at privacy@routine-app.com or through the app's support section.",
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <CMSContent
      title="Privacy Policy"
      sections={privacyPolicySections}
    />
  );
}
