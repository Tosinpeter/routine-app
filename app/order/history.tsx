import { AppText as Text } from '@/components/app-text';
import { OrderCard } from '@/components/order/OrderCard';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrderHistoryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={20} color="#161B26" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order History</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>

                <View style={styles.monthSection}>
                    <Text style={styles.monthTitle}>January 2025</Text>
                    <OrderCard
                        title="Acne Control - 30 Day Plan"
                        productCount={4}
                        status="Active"
                        images={[
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                        ]}
                        progress={0.2}
                        estimatedTime="Estimated to last 5 days"
                    />
                </View>

                <View style={styles.monthSection}>
                    <Text style={styles.monthTitle}>December 2024</Text>
                    <OrderCard
                        title="Hydration Boost - 30 Day Plan"
                        productCount={4}
                        status="Completed"
                        images={[
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                        ]}
                        progress={1.0}
                        estimatedTime="Dec 1 - Dec 30"
                    />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1EE', // From Figma
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: Fonts.medium, // 500
        fontSize: scale(24),
        color: '#20201E',
        textAlign: 'center',
    },
    scrollContent: {
        padding: scale(16),
        gap: verticalScale(24),
    },
    monthSection: {
        gap: verticalScale(16),
    },
    monthTitle: {
        fontFamily: Fonts.regular,
        fontSize: scale(14),
        color: '#20201E',
        opacity: 0.5,
    },
});
