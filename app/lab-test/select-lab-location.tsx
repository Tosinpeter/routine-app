import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { AppTextInput } from "@/components/app-text-input";
import { BackButton } from "@/components/back-button";
import { FilterCTAIcon } from "@/components/icons/FilterCTAIcon";
import { LocationPinIcon } from "@/components/icons/LocationPinIcon";
import {
  moderateScale,
  scale,
  scaleIcon,
  verticalScale,
} from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, HitSlop } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { t } from "@/i18n";

interface LabLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  latitude: number;
  longitude: number;
}

const LABS: LabLocation[] = [
  {
    id: "1",
    name: "Medicina Lab",
    address: "Olympiakwartier, Almere",
    distance: "1,5 km",
    latitude: 40.6425,
    longitude: -74.1435,
  },
  {
    id: "2",
    name: "Almere Diagnostics",
    address: "Transistorstraat, Almer, Netherlands",
    distance: "3,1 km",
    latitude: 40.6385,
    longitude: -74.1515,
  },
  {
    id: "3",
    name: "LabCenter Schiphol",
    address: "Evert van de Beekstraat 202, Schiphol",
    distance: "26 km",
    latitude: 40.635,
    longitude: -74.16,
  },
  {
    id: "4",
    name: "LabCenter Schiphol",
    address: "Evert van de Beekstraat 202, Schiphol",
    distance: "26 km",
    latitude: 40.632,
    longitude: -74.155,
  },
];

const INITIAL_REGION: Region = {
  latitude: 40.6382,
  longitude: -74.1432,
  latitudeDelta: 0.025,
  longitudeDelta: 0.025,
};

export default function SelectLabLocationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);

  const filteredLabs = searchQuery
    ? LABS.filter(
      (lab) =>
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : LABS;

  const handleLabSelect = useCallback((lab: LabLocation) => {
    setSelectedLabId(lab.id);
    router.push("/lab-test/book-lab-test");
  }, []);

  const renderLabItem = useCallback(
    ({ item }: { item: LabLocation }) => (
      <TouchableOpacity
        style={styles.labItem}
        activeOpacity={0.7}
        onPress={() => handleLabSelect(item)}
      >
        <View style={styles.labPinContainer}>
          <View style={styles.labPin}>
            <LocationPinIcon />
          </View>
        </View>
        <View style={styles.labInfo}>
          <Text style={styles.labName}>{item.name}</Text>
          <Text style={styles.labAddress}>{item.address}</Text>
        </View>
        <Text style={styles.labDistance}>{item.distance}</Text>
      </TouchableOpacity>
    ),
    [handleLabSelect]
  );

  const keyExtractor = useCallback((item: LabLocation) => item.id, []);

  const itemSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
          showsUserLocation
          showsMyLocationButton={false}
        >
          {LABS.map((lab) => (
            <Marker
              key={lab.id}
              coordinate={{
                latitude: lab.latitude,
                longitude: lab.longitude,
              }}
              title={lab.name}
              description={lab.address}
            />
          ))}
        </MapView>

        <SafeAreaView style={styles.mapOverlay} edges={["top"]} pointerEvents="box-none">
          <BackButton style={styles.backButton} />
        </SafeAreaView>
      </View>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        {/* Drag Handle */}
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {t("labLocation.title")}
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={scaleIcon(20)}
            color={Colors.light.grey400}
            style={styles.searchIcon}
          />
          <AppTextInput
            style={styles.searchInput}
            placeholder={t("labLocation.searchPlaceholder")}
            placeholderTextColor={Colors.light.grey400}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={HitSlop.medium}
            style={styles.crosshairButton}
          >
            <FilterCTAIcon
              size={scaleIcon(22)}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>

        {/* Lab List */}
        <FlatList
          data={filteredLabs}
          renderItem={renderLabItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.scaffold,
  },
  // Map
  mapContainer: {
    height: "42%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    marginLeft: scale(16),
  },
  // Bottom Panel
  bottomPanel: {
    flex: 1,
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    marginTop: -scale(20),
    paddingHorizontal: scale(20),
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: verticalScale(12),
  },
  handle: {
    width: scale(40),
    height: verticalScale(4),
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.lightGrey300,
  },
  title: {
    fontSize: moderateScale(24),
    textAlign: 'center',
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginVertical: verticalScale(18),
  },
  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgba(237, 235, 227, 1)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    paddingVertical: verticalScale(14),
    borderColor: Colors.light.grey200,
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(8),
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    flex: 1,
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.text,
    lineHeight: 15,
    paddingVertical: verticalScale(0),
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  crosshairButton: {
    marginLeft: scale(8),
  },
  // List
  listContent: {
    paddingBottom: verticalScale(24),
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.grey200,
  },
  // Lab Item
  labItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(16),
  },
  labPinContainer: {
    marginRight: scale(14),
  },
  labPin: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.light.statusBadgeBg,
    alignItems: "center",
    justifyContent: "center",
  },
  labPinDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: Colors.light.tint,
  },
  labInfo: {
    flex: 1,
    marginRight: scale(12),
  },
  labName: {
    ...AppTextStyle.subtitle2,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.mainDarkColor,
    marginBottom: verticalScale(3),
  },
  labAddress: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.grey500,
  },
  labDistance: {
    ...AppTextStyle.bodyText2,
    fontFamily: AeonikFonts.regular,
    opacity: 0.6,
    color: 'rgba(32, 32, 30, 1)',
  },
});
