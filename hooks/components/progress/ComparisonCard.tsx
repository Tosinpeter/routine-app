import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '@/constants/scaling';
import { AeonikFonts, Colors } from '@/constants/theme';

export function ComparisonCard() {
    return (
        <View style={styles.card}>
            {/* Main Image Container */}
            <View style={styles.imageContainer}>
                {/* Placeholder for the split face image */}
                <Image
                    source={require("@/assets/images/comparison-face.png")}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Overlays */}
                <View style={styles.overlayContainer}>
                    {/* Before Label */}
                    {/* <View style={[styles.labelPill, styles.beforePos]}>
                        <Text style={styles.labelText}>Before</Text>
                    </View> */}

                    {/* After Label */}
                    {/* <View style={[styles.labelPill, styles.afterPos]}>
                        <Text style={styles.labelText}>After</Text>
                    </View> */}

                    {/* Center Slider Handle (Visual only) */}
                    <View style={styles.sliderHandle}>
                        <Ionicons name="resize-outline" size={scale(16)} color={Colors.light.infoBlue} />
                    </View>

                    {/* Date Badge: Feb 02 2025 (Left) */}
                    {/* <View style={[styles.dateBadge, styles.dateLeft]}>
                        <Ionicons name="calendar-outline" size={scale(12)} color={Colors.light.mainDarkColor} />
                        <View>
                            <Text style={styles.dateText}>Feb 02</Text>
                            <Text style={styles.yearText}>2025</Text>
                        </View>
                    </View> */}

                    {/* Date Badge: Feb 02 2025 (Right) */}
                    {/* <View style={[styles.dateBadge, styles.dateRight]}>
                        <Ionicons name="calendar-outline" size={scale(12)} color={Colors.light.mainDarkColor} />
                        <View>
                            <Text style={styles.dateText}>Feb 02</Text>
                            <Text style={styles.yearText}>2025</Text>
                        </View>
                    </View> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 213,
        borderRadius: 16,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelPill: {
        position: 'absolute',
        top: verticalScale(100), // Approximate vertical center roughly
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(4),
        backgroundColor: Colors.light.overlay,
        borderRadius: 100,
    },
    labelText: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(12),
        color: Colors.light.white,
    },
    beforePos: {
        left: scale(40),
        top: '50%',
    },
    afterPos: {
        right: scale(40),
        top: '50%',
    },
    sliderHandle: {
        position: 'absolute',
        width: scale(32),
        height: scale(32),
        borderRadius: 16,
        backgroundColor: Colors.light.white,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: '50%',
        marginTop: scale(-16),
        zIndex: 10,
    },
    dateBadge: {
        position: 'absolute',
        bottom: verticalScale(16),
        backgroundColor: Colors.light.white,
        padding: scale(8),
        borderRadius: 8,
        flexDirection: 'column',
        alignItems: 'center',
        gap: scale(4),
        width: scale(50),
        shadowColor: Colors.light.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dateLeft: {
        left: scale(20),
    },
    dateRight: {
        right: scale(20),
    },
    dateText: {
        fontFamily: AeonikFonts.medium,
        fontSize: scale(10),
        color: Colors.light.mainDarkColor,
        textAlign: 'center',
    },
    yearText: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(10),
        color: Colors.light.mainDarkColor,
        opacity: 0.6,
        textAlign: 'center',
    }
});
