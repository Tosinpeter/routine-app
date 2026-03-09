import React from "react";
import { CMSContent, CMSSection } from "@/components/cms/CMSContent";
import { t } from "@/i18n";

export default function TermsOfUseScreen() {
  const termsOfUseSections: CMSSection[] = [
    {
      title: t("terms.heading"),
      content: t("terms.lastUpdated"),
    },
    {
      title: t("terms.acceptanceOfTerms"),
      content: t("terms.acceptanceContent"),
    },
    {
      title: t("terms.useLicense"),
      items: [
        t("terms.useLicenseItem1"),
        t("terms.useLicenseItem2"),
        t("terms.useLicenseItem3"),
      ],
    },
    {
      title: t("terms.medicalDisclaimer"),
      content: t("terms.medicalDisclaimerContent"),
    },
    {
      title: t("terms.userResponsibilities"),
      items: [
        t("terms.userResponsibilityItem1"),
        t("terms.userResponsibilityItem2"),
        t("terms.userResponsibilityItem3"),
        t("terms.userResponsibilityItem4"),
        t("terms.userResponsibilityItem5"),
      ],
    },
    {
      title: t("terms.accountTermination"),
      content: t("terms.accountTerminationContent"),
    },
    {
      title: t("terms.limitationsOfLiability"),
      content: t("terms.limitationsContent"),
    },
    {
      title: t("terms.intellectualProperty"),
      content: t("terms.intellectualPropertyContent"),
    },
    {
      title: t("terms.prohibitedActivities"),
      items: [
        t("terms.prohibitedItem1"),
        t("terms.prohibitedItem2"),
        t("terms.prohibitedItem3"),
        t("terms.prohibitedItem4"),
        t("terms.prohibitedItem5"),
      ],
    },
    {
      title: t("terms.subscriptionAndPayments"),
      content: t("terms.subscriptionContent"),
    },
    {
      title: t("terms.refundPolicy"),
      content: t("terms.refundContent"),
    },
    {
      title: t("terms.changesToTerms"),
      content: t("terms.changesToTermsContent"),
    },
    {
      title: t("terms.governingLaw"),
      content: t("terms.governingLawContent"),
    },
    {
      title: t("terms.contactInformation"),
      content: t("terms.contactContent"),
    },
  ];

  return (
    <CMSContent
      title={t("terms.title")}
      sections={termsOfUseSections}
    />
  );
}
