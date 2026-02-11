import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { AppText as Text } from "@/components/app-text";
import { CheckmarkIcon } from "@/components/icons/checkmark-icon";
import { ClinicTestIcon } from "@/components/icons/clinic-test-icon";
import { DoctorReviewIcon } from "@/components/icons/doctor-review-icon";
import { FaceScanIcon } from "@/components/icons/face-scan-icon";
import { AeonikFonts, Colors } from "@/constants/theme";
import { scale, verticalScale } from "@/constants/scaling";
import { useAppSelector } from "@/store/hooks";
import { RoutineStatus } from "@/store/slices/home-slice";

export function ProgressStepsCard() {
    const { reviewSteps } = useAppSelector((state) => state.home);

    // Exact Figma Y positions for the steps
    const STEP_Y_POSITIONS = [0, 67.03, 134.06];

    return (
        <View style={styles.card}>
            <View style={styles.contentContainer}>

                {/* === LEFT COLUMN: Lines & Ticks (Absolute) === */}

                {/* Connector Lines */}
                <View style={[styles.connectorLine, { top: scale(28.73) }]} />
                <View style={[styles.connectorLine, { top: scale(95.76) }]} />

                {/* Steps */}
                {reviewSteps.map((step, index) => {
                    const isCompleted = step.status === RoutineStatus.Approved;
                    const isLast = index === reviewSteps.length - 1;
                    const topPos = scale(STEP_Y_POSITIONS[index]);

                    return (
                        <View key={step.id} style={[styles.stepRowAbsolute, { top: topPos }]}>

                            {/* Left Checkmark (Absolute at 0,0 relative to row) */}
                            <View style={styles.checkmarkContainer}>
                                {/* Background to mask the line if needed, though lines are positioned to not overlap */}
                                <CheckmarkIcon
                                    color={isCompleted ? "#079455" : "#D0D5DD"}
                                    width={scale(20)}
                                    height={scale(23.94)}
                                />
                            </View>

                            {/* Right Content (Absolute/Flex relative to row, left offset 28px) */}
                            <View style={styles.contentRight}>

                                {/* Header Row: Icon + Title + Status */}
                                <View style={styles.headerRow}>
                                    <View style={styles.titleSection}>
                                        {/* Step Icon */}
                                        <View style={styles.stepIconPlaceholder}>
                                            {index === 0 && <FaceScanIcon width={scale(19)} height={scale(19)} color={Colors.light.grey700} />}
                                            {index === 1 && <ClinicTestIcon width={scale(19)} height={scale(22)} color={Colors.light.grey700} />}
                                            {index === 2 && <DoctorReviewIcon width={scale(19)} height={scale(20)} color={Colors.light.grey700} />}
                                        </View>

                                        {/* Title */}
                                        <Text style={styles.stepTitle}>{step.title}</Text>
                                    </View>

                                    {/* Status Indicator */}
                                    {isCompleted ? (
                                        <View style={styles.statusCompleted}>
                                            <Ionicons name="checkmark-circle" size={scale(20)} color="#079455" />
                                        </View>
                                    ) : (
                                        <Text style={styles.statusPending}>Pending</Text>
                                    )}
                                </View>

                                {/* Divider - Positioned manually to match visual gap */}
                                {!isLast && (
                                    <View style={styles.divider} />
                                )}

                            </View>
                        </View>
                    );
                })}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: scale(10),
        // Padding from Figma: 21px 16px
        paddingVertical: scale(21),
        paddingHorizontal: scale(16),

        // Total dimensions
        width: "100%", // 358px
        minWidth: scale(358),
        // height: verticalScale(200),
        marginBottom: scale(16),
    },
    contentContainer: {
        // Inner area size: 358 - 32 = 326px wide. 200 - 42 = 158px tall.
        width: "100%",
        height: scale(158),
        position: 'relative', // Context for absolute children
    },

    // === Connector Lines ===
    connectorLine: {
        position: 'absolute',
        left: scale(10),
        height: scale(33.52),
        backgroundColor: '#EAECF0',
        width: 1, // Fixed duplicate
        zIndex: 0,
    },

    // === Row ===
    stepRowAbsolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        // Height doesn't strictly matter for container if children are laid out, 
        // but useful for debugging.
        height: scale(24),
    },

    // === Left Checkmark ===
    checkmarkContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: scale(20),
        height: scale(24), // Approx
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    // === Right Content ===
    contentRight: {
        marginLeft: scale(28), // 20px (icon) + 8px (gap)
        flex: 1,
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scale(20), // Line up with the checkmark roughly
    },

    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },

    stepIconPlaceholder: {
        width: scale(19),
        height: scale(19),
        justifyContent: 'center',
        alignItems: 'center',
        // Ensure icons don't collapse
    },

    stepTitle: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(17),
        color: '#20201E',
        lineHeight: scale(17),
    },

    statusCompleted: {
        width: scale(20),
        height: scale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusPending: {
        fontFamily: AeonikFonts.regular,
        fontSize: scale(16),
        color: '#CF604A',
        textAlign: 'center',
        // lineHeight: scale(16),
    },

    divider: {
        height: 1,
        backgroundColor: '#EAECF0', // Border 0.8px ideal, 1px fine
        width: '100%',
        // Positioning: gap 24px from the content.
        // Content height ~20px. 
        // Top of divider = 20 + 24 = 44px.
        marginTop: scale(24),
        // Figma says Divider has Height 0, Border 0.8px.
        // In RN, height 1 is good.
    },

});
