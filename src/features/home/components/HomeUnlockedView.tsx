import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale, verticalScale } from '@/constants/scaling';

// Reused Components
import { HomeHeader } from "./HomeHeader";
import { ProductReminderCard } from "./ProductReminderCard";
import { ContactSupportButton } from "./ContactSupportButton";

// New Components
import { TreatmentPlanCard } from "./TreatmentPlanCard";
import { DermatologistSupportCard } from "./DermatologistSupportCard";
import { LabReportButton } from "./LabReportButton";
import { ProgressBeforeAfterCard } from "./ProgressBeforeAfterCard";

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
