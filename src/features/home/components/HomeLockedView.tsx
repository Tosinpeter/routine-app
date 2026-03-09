import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Colors, Fonts } from '@/constants/theme';
import { t } from "@/i18n";

// Import Home Components
import { HomeHeader } from "./HomeHeader";
import { ProgressStepsCard } from "./ProgressStepsCard";
import { UploadPrescriptionCard } from "./UploadPrescriptionCard";
import { SkinRoutineCard } from "./SkinRoutineCard";
import { ProductReminderCard } from "./ProductReminderCard";
import { ProgressPreviewCard } from "./ProgressPreviewCard";
import { ContactSupportButton } from "./ContactSupportButton";
import { DermatologistSupportCard } from './DermatologistSupportCard';

export function HomeLockedView() {
    return (
        <View style={styles.content}>
            <HomeHeader />

            <ProgressStepsCard />

            <UploadPrescriptionCard />

            <SkinRoutineCard />

            <DermatologistSupportCard />


            <ProductReminderCard />
            <Text style={styles.headerTitle}>{t("home.progress.title")}</Text>
            <ProgressPreviewCard />

            <ContactSupportButton />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: verticalScale(24),
        paddingHorizontal: scale(16),
    },
    headerTitle: {
        fontFamily: Fonts.bold,
        fontSize: scale(24),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        color: Colors.light.mainDarkColor,
        marginBottom: scale(12),
    },
});
