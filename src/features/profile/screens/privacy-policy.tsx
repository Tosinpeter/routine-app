import React from "react";
import { CMSContent, CMSSection } from "@/components/cms/CMSContent";
import { t } from "@/i18n";

export default function PrivacyPolicyScreen() {
  const privacyPolicySections: CMSSection[] = [
    {
      title: t("privacy.heading"),
      content: t("privacy.intro"),
    },
    {
      title: t("privacy.whatWeCollect"),
      items: [
        t("privacy.collectItem1"),
        t("privacy.collectItem2"),
        t("privacy.collectItem3"),
        t("privacy.collectItem4"),
        t("privacy.collectItem5"),
      ],
    },
    {
      title: t("privacy.whyWeUse"),
      items: [
        t("privacy.useItem1"),
        t("privacy.useItem2"),
        t("privacy.useItem3"),
        t("privacy.useItem4"),
      ],
    },
    {
      title: t("privacy.howProtected"),
      items: [
        t("privacy.protectedItem1"),
        t("privacy.protectedItem2"),
      ],
    },
    {
      title: t("privacy.yourRights"),
      items: [
        t("privacy.rightItem1"),
        t("privacy.rightItem2"),
      ],
    },
    {
      title: t("privacy.dataRetention"),
      content: t("privacy.dataRetentionContent"),
    },
    {
      title: t("privacy.thirdPartyServices"),
      content: t("privacy.thirdPartyContent"),
    },
    {
      title: t("privacy.cookiesAndTracking"),
      content: t("privacy.cookiesContent"),
    },
    {
      title: t("privacy.childrensPrivacy"),
      content: t("privacy.childrensContent"),
    },
    {
      title: t("privacy.changesToPolicy"),
      content: t("privacy.changesToPolicyContent"),
    },
    {
      title: t("privacy.contactUs"),
      content: t("privacy.contactContent"),
    },
  ];

  return (
    <CMSContent
      title={t("privacy.title")}
      sections={privacyPolicySections}
    />
  );
}
