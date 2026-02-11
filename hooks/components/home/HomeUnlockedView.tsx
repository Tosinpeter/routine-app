import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale, verticalScale } from '@/constants/scaling';

// Reused Components
import { HomeHeader } from "@/components/home/HomeHeader";
import { ProductReminderCard } from "@/components/home/ProductReminderCard";
import { ContactSupportButton } from "@/components/home/ContactSupportButton";

// New Components
import { TreatmentPlanCard } from "@/components/home/TreatmentPlanCard";
import { DermatologistSupportCard } from "@/components/home/DermatologistSupportCard";
import { LabReportButton } from "@/components/home/LabReportButton";
import { ProgressBeforeAfterCard } from "@/components/home/ProgressBeforeAfterCard";

export function HomeUnlockedView() {
    return (
        <View style={styles.content}>
            <HomeHeader />

            <TreatmentPlanCard />

            <DermatologistSupportCard />

            <LabReportButton />

            <ProductReminderCard />

            <ProgressBeforeAfterCard />

            <ContactSupportButton />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: verticalScale(24),
        paddingHorizontal: scale(16),
        gap: verticalScale(16), // Consistent gap between cards
        paddingBottom: verticalScale(20),
    },
});
