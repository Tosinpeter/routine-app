import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StarIcon } from './icons/StarIcon';
import { TrustBadge } from './icons/TrustBadge';
// ... styles update needed, skipping replacement of imports. 
// I will target styles directly.

// Validated "TrustCard" (Green Shield) from previous step
const TrustCard = () => (
    <View style={styles.trustCard}>
        <View style={styles.trustIconContainer}>
            <TrustBadge width={32} height={32} />
        </View>
        <Text style={styles.trustText}>
            we are using 100% certified famous and best brand that will perfectly fit your skin
        </Text>
    </View>
);

// New "RatingCard" (Star)
const RatingCard = () => (
    <View style={styles.ratingCard}>
        {/* Star Icon Box */}
        <View style={styles.starIconBox}>
            <StarIcon width={48} height={48} color="#CF604A" />
        </View>

        {/* Text Group */}
        <View style={styles.ratingTextGroup}>
            {/* Rating Row: 4.9/5 by 12,000+ users */}
            <View style={styles.ratingRow}>
                <Text style={styles.ratingValue}>4.9/5</Text>
                <Text style={styles.userCount}>by 12,000+ users</Text>
            </View>

            {/* Description */}
            <Text style={styles.ratingDescription}>Visible improvements in just weeks.</Text>
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
        gap: verticalScale(16), // Spacing between the two cards
    },
    // --- Trust Card Styles ---
    trustCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        gap: 8,
        width: scale(358),
        height: verticalScale(72),
        backgroundColor: 'rgba(255, 255, 255, 0.48)',
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
        color: '#20201E',
    },

    // --- Rating Card Styles ---
    ratingCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 12,
        width: scale(358),
        height: verticalScale(82),
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    starIconBox: {
        width: 48,
        height: 48,
        // background #D9D9D9 in design is just placeholder for box size usually, but we keep it transparent or remove
        // icon itself handles visual
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
        fontFamily: Fonts.medium, // SF Pro 510 -> approx Medium/SemiBold
        fontSize: scale(24),
        lineHeight: scale(24),
        color: '#20201E',
        letterSpacing: -0.24, // -0.01em of 24px
    },
    userCount: {
        fontFamily: Fonts.regular, // SF Pro 400
        fontSize: scale(13),
        lineHeight: scale(13),
        color: '#20201E',
        marginBottom: 4, // Align baseline roughly
    },
    ratingDescription: {
        fontFamily: Fonts.regular, // SF Pro 400
        fontSize: scale(13),
        lineHeight: scale(19.5), // 150%
        color: '#20201E',
    }
});
