import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Colors, Fonts } from '@/constants/theme';

// Import Home Components
import { HomeHeader } from "@/components/home/HomeHeader";
import { ProgressStepsCard } from "@/components/home/ProgressStepsCard";
import { UploadPrescriptionCard } from "@/components/home/UploadPrescriptionCard";
import { SkinRoutineCard } from "@/components/home/SkinRoutineCard";
import { DermatologyInsightCard } from "@/components/home/DermatologyInsightCard";
import { ProductReminderCard } from "@/components/home/ProductReminderCard";
import { ProgressPreviewCard } from "@/components/home/ProgressPreviewCard";
import { ContactSupportButton } from "@/components/home/ContactSupportButton";
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
            <Text style={styles.headerTitle}>Your Progress</Text>
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
        color: Colors.light.mainDarkColor,
        marginBottom: scale(12),
    },
});
