import { AppText as Text } from '@/components/app-text';
import { scale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { OrderTimeIcon } from './OrderTimeIcon';
import { t } from "@/i18n";

interface OrderCardProps {
    title: string;
    productCount: number;
    status: 'Active' | 'Completed';
    images: any[];
    progress: number; // 0 to 1
    estimatedTime: string;
    onViewDetails?: () => void;
    onReorder?: () => void;
}

export function OrderCard({
    title,
    productCount,
    status,
    images,
    progress,
    estimatedTime,
    onViewDetails: _onViewDetails,
    onReorder,
}: OrderCardProps) {
    const router = useRouter();
    const isActive = status === 'Active';

    return (
        <View style={styles.container}>
            <View style={styles.productInfo}>
                {/* Product Summary */}
                <View style={styles.productSummary}>
                    {/* Header: Product Info & Status */}
                    <View style={styles.header}>
                        <View style={styles.productDescription}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{t("order.details.productIncluded", { count: productCount })}</Text>
                        </View>
                        <View style={[styles.statusContainer, isActive ? styles.statusActive : styles.statusCompleted]}>
                            <Text style={[styles.statusText, isActive ? styles.statusTextActive : styles.statusTextCompleted]}>
                                {status}
                            </Text>
                        </View>
                    </View>

                    {/* Product Images */}
                    <View style={styles.productImages}>
                        {images.slice(0, 4).map((img, index) => (
                            <View key={index} style={styles.productImageContainer}>
                                <Image source={img} style={styles.productImage} contentFit="contain" cachePolicy="memory-disk" recyclingKey={`order-img-${index}`} />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Product Timeline */}
                <View style={styles.productTimeline}>
                    {/* Progress Bar Container */}
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBackground}>
                            <View style={styles.progressBar}>
                                <View style={styles.progressBackground} />
                                <View style={[styles.progressIndicator, { width: `${progress * 100}%` }]} />
                            </View>
                        </View>
                        <View style={styles.estimatedTime}>
                            <OrderTimeIcon size={20} color={isActive ? "#CF604A" : "#667085"} />
                            <Text style={styles.estimatedTimeText}>{estimatedTime}</Text>
                        </View>
                    </View>

                    {/* CTAs */}
                    <View style={styles.ctaContainer}>
                        <TouchableOpacity style={styles.secondaryCTA} onPress={() => router.push('/order/details')} activeOpacity={0.8}>
                            <Text style={styles.ctaLabelSecondary}>{t("order.viewDetails")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryCTA} onPress={onReorder} activeOpacity={0.8}>
                            <Text style={styles.ctaLabelPrimary}>{t("order.reorder")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        // Gap here is technically between internal items, but we have one child wrapper
    },
    productInfo: {
        gap: 16,
    },
    productSummary: {
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 13,
    },
    productDescription: {
        flex: 1,
        gap: 12,
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: scale(18),
        lineHeight: 18,
        color: '#20201E',
    },
    subtitle: {
        fontFamily: Fonts.regular,
        fontSize: scale(17),
        lineHeight: 17,
        color: '#667085',
    },
    statusContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
    },
    statusActive: {
        backgroundColor: '#ECFDF3',
    },
    statusCompleted: {
        backgroundColor: '#F6F0EE',
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
    productImages: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        height: 68,
    },
    productImageContainer: {
        width: 68,
        height: 68,
        backgroundColor: '#F2F4F7',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 67,
        height: 62,
    },
    productTimeline: {
        gap: 16,
    },
    progressBarContainer: {
        gap: 8,
    },
    progressBarBackground: { // Wrapper for the bar itself if needed
        height: 9,
        justifyContent: 'center',
    },
    progressBar: {
        width: '100%',
        height: 9,
    },
    progressBackground: {
        position: 'absolute',
        width: '100%',
        height: 9,
        backgroundColor: '#F2F4F7',
        borderRadius: 100,
    },
    progressIndicator: {
        position: 'absolute',
        height: 9,
        backgroundColor: '#2F46FF',
        borderRadius: 100,
    },
    estimatedTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height: 20,
    },
    estimatedTimeText: {
        fontFamily: Fonts.regular,
        fontSize: scale(17),
        lineHeight: 17,
        color: '#667085',
    },
    ctaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 40,
    },
    secondaryCTA: {
        flex: 1,
        height: 40,
        backgroundColor: '#EDEBE3',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaLabelSecondary: {
        fontFamily: Fonts.medium,
        fontSize: scale(14),
        color: '#182230',
    },
    primaryCTA: {
        flex: 1,
        height: 40,
        backgroundColor: '#CF604A',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaLabelPrimary: {
        fontFamily: Fonts.medium,
        fontSize: scale(14),
        color: '#FFFFFF',
    },
});
