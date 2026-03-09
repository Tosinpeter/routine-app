import { AppText as Text } from '@/components/app-text';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import { t } from '@/i18n';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ProgressRing } from './ProgressRing';

interface ProductItemCardProps {
    name: string;
    usage: string; // e.g. "Morning Only"
    image: any;
    status?: 'Active' | 'Completed';
    onReorder?: () => void;
}

export function ProductItemCard({
    name,
    usage,
    image,
    status = 'Active',
    onReorder,
}: ProductItemCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.contentRow}>
                {/* Product Info Row */}
                <View style={styles.infoRow}>
                    <ProgressRing image={image} size={56} />
                    <View style={styles.textContainer}>
                        <Text style={styles.productName}>{name}</Text>
                        <Text style={styles.usageText}>{usage}</Text>
                    </View>
                </View>

                {/* Status Badge - Absolute positioned as per CSS or Flex? 
                   CSS says absolute right 12 top 16 inside "ProductItemCard"
                */}
                <View style={[styles.statusBadge, status === 'Active' ? styles.statusActive : styles.statusCompleted]}>
                    <Text style={[styles.statusText, status === 'Active' ? styles.statusTextActive : styles.statusTextCompleted]}>
                        {status}
                    </Text>
                </View>
            </View>

            {/* Reorder Button */}
            <TouchableOpacity style={styles.reorderButton} onPress={onReorder} activeOpacity={0.8}>
                <Text style={styles.reorderButtonText}>{t("product.reorder")}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', // 358px fixed in CSS, but 100% is better for responsiveness
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        gap: 16,
        position: 'relative', // For absolute status badge if needed, though flex might be cleaner. 
        // User CSS used absolute for status. I will follow that for exactness.
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Top aligned to allow status text to be separate or just use the absolute
        justifyContent: 'space-between',
        // height: 56, // Matches image height
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1, // Take available space
    },
    textContainer: {
        gap: 8, // Product Name Container gap
        flex: 1,
        paddingEnd: 60, // Space for status badge (RTL-aware)
    },
    productName: {
        fontFamily: Fonts.medium, // 500
        fontSize: scale(17),
        lineHeight: scale(19), // 110%
        color: '#161718',
        letterSpacing: -0.005 * 17,
    },
    usageText: {
        fontFamily: Fonts.regular, // 400
        fontSize: scale(14),
        lineHeight: 14,
        color: '#667085',
    },
    statusBadge: {
        position: 'absolute',
        top: 0,
        end: 0,
        // CSS says top 16 right 12 relative to card. 
        // My container has padding 16. So top 0 right 0 relative to logical content? 
        // No, CSS: "right: 12px; top: 16px;". 
        // Since I have padding 16 on container, top 0 inside content is top 16 on card. 
        // But right 12 means it's -4px from the right padding edge (16px).
        // Let's use absolute on the container directly if possible, or adjust here.
        // Actually, simpler to put it absolute in container.
    },
    statusActive: {
        backgroundColor: '#ECFDF3',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
    },
    statusCompleted: {
        backgroundColor: '#F6F0EE',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
    },
    statusText: {
        fontFamily: Fonts.regular,
        fontSize: scale(12),
        lineHeight: 12,
    },
    statusTextActive: {
        color: '#079455',
    },
    statusTextCompleted: {
        color: '#CF604A',
    },
    reorderButton: {
        width: '100%',
        height: verticalScale(40),
        backgroundColor: '#EDEBE3',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reorderButtonText: {
        fontFamily: Fonts.medium,
        fontSize: scale(14),
        color: '#20201E',
    },
});
