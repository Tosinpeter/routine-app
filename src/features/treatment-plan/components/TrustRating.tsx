import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StarIcon } from './icons/StarIcon';
import { TrustBadge } from './icons/TrustBadge';
import { t } from "@/i18n";

const TrustCard = () => (
    <View style={styles.trustCard}>
        <View style={styles.trustIconContainer}>
            <TrustBadge width={32} height={32} />
        </View>
        <Text style={styles.trustText}>
            {t("treatmentPlan.trust.trustText")}
        </Text>
    </View>
);

const RatingCard = () => (
    <View style={styles.ratingCard}>
        {/* Star Icon Box */}
        <View style={styles.starIconBox}>
            <StarIcon width={48} height={48} color={Colors.light.tint} />
        </View>

        {/* Text Group */}
        <View style={styles.ratingTextGroup}>
            {/* Rating Row: 4.9/5 by 12,000+ users */}
            <View style={styles.ratingRow}>
                <Text style={styles.ratingValue}>{t("treatmentPlan.trust.ratingValue")}</Text>
                <Text style={styles.userCount}>{t("treatmentPlan.trust.userCount")}</Text>
            </View>

            {/* Description */}
            <Text style={styles.ratingDescription}>{t("treatmentPlan.trust.ratingDescription")}</Text>
        </View>
    </View>
);

export function TrustRating() {
    return (
        <View style={styles.container}>
            <TrustCard />
            <RatingCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        gap: verticalScale(16),
    },
    trustCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        gap: 8,
        width: scale(358),
        height: verticalScale(72),
        backgroundColor: Colors.light.whiteAlpha48,
        borderRadius: 8,
    },
    trustIconContainer: {
        width: 32,
        height: 32,
    },
    trustText: {
        width: scale(286),
        fontFamily: Fonts.regular,
        fontSize: scale(13),
        lineHeight: scale(19.5),
        color: Colors.light.mainDarkColor,
    },
    ratingCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 12,
        width: scale(358),
        height: verticalScale(82),
        backgroundColor: Colors.light.white,
        borderRadius: 8,
    },
    starIconBox: {
        width: 48,
        height: 48,
    },
    ratingTextGroup: {
        flex: 1,
        gap: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    ratingValue: {
        fontFamily: Fonts.medium,
        fontSize: scale(24),
        lineHeight: scale(24),
        color: Colors.light.mainDarkColor,
        letterSpacing: -0.24,
    },
    userCount: {
        fontFamily: Fonts.regular,
        fontSize: scale(13),
        lineHeight: scale(13),
        color: Colors.light.mainDarkColor,
        marginBottom: 4,
    },
    ratingDescription: {
        fontFamily: Fonts.regular,
        fontSize: scale(13),
        lineHeight: scale(19.5),
        color: Colors.light.mainDarkColor,
    }
});
