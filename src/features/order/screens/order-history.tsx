import { AppText as Text } from '@/components/app-text';
import { OrderCard } from '@/features/order/components/OrderCard';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from "@/i18n";

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
                    <Ionicons name="arrow-back" size={20} color={Colors.light.navDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t("order.history.title")}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>

                <View style={styles.monthSection}>
                    <Text style={styles.monthTitle}>{t("months.january")} 2025</Text>
                    <OrderCard
                        title={t("order.demo.plan1")}
                        productCount={4}
                        status="Active"
                        images={[
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                        ]}
                        progress={0.2}
                        estimatedTime={t("order.estimatedTimeDemo", { days: 5 })}
                    />
                </View>

                <View style={styles.monthSection}>
                    <Text style={styles.monthTitle}>{t("months.december")} 2024</Text>
                    <OrderCard
                        title={t("order.demo.plan2")}
                        productCount={4}
                        status="Completed"
                        images={[
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                            require('@/assets/images/img_product-image.png'),
                        ]}
                        progress={1.0}
                        estimatedTime={t("order.dateRange", { start: "Dec 1", end: "Dec 30" })}
                    />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F1EE',
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
        fontFamily: Fonts.medium,
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
