import { AppText as Text } from '@/components/app-text';
import { ProductItemCard } from '@/features/product/components/ProductItemCard';
import { scale, verticalScale } from '@/constants/scaling';
import { Fonts, Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from "@/i18n";

export default function OrderDetailsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={20} color={Colors.light.navDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t("order.history.title")}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false}>

                {/* Plan Summary - planName should come from API with localised content */}
                <View style={styles.planSummary}>
                    <Text style={styles.planTitle}>{t("order.demo.plan1")}</Text>
                    <Text style={styles.planSubtitle}>{t("order.details.doctorApproved")}</Text>
                </View>

                {/* Product List */}
                <View style={styles.productList}>
                    <ProductItemCard
                        name="Gentle Cleanser"
                        usage={t("order.details.productIncluded", { count: 4 })}
                        image={require('@/assets/images/img_product-image.png')}
                        status={"Active"}
                    />
                    <ProductItemCard
                        name="Vitamin C Serum"
                        usage={t("order.details.morningOnly")}
                        image={require('@/assets/images/img_product-image.png')}
                        status={"Active"}
                    />
                    <ProductItemCard
                        name="Acne Treatment Gel"
                        usage={t("order.details.nightOnly")}
                        image={require('@/assets/images/img_product-image.png')}
                        status={"Active"}
                    />
                    <ProductItemCard
                        name="Acne Treatment Gel" // Duplicate for scrolling check
                        usage={t("order.details.morningOnly")}
                        image={require('@/assets/images/img_product-image.png')}
                        status={"Active"}
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
        gap: 24,
    },
    planSummary: {
        gap: 8,
    },
    planTitle: {
        fontFamily: Fonts.medium,
        fontSize: scale(20),
        lineHeight: scale(24),
        color: '#101828',
    },
    planSubtitle: {
        fontFamily: Fonts.regular,
        fontSize: scale(17),
        lineHeight: 17,
        color: '#667085',
    },
    productList: {
        gap: 16,
    },
});
