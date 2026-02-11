import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { ThemedView } from "@/components/themed-view";
import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";

import { scale, moderateScale, verticalScale } from "@/constants/scaling";
import { Colors, AeonikFonts, Shadows } from "@/constants/theme";
import { HomeIcon } from "@/components/icons";
import { PrimaryButton } from "@/components/primary-button";

const { width, height } = Dimensions.get("window");

export default function AddAddressScreen() {
  const params = useLocalSearchParams<{ type?: string }>();
  const addressType = params?.type || "new";
  
  const mapRef = useRef<MapView>(null);
  const [address, setAddress] = useState("09 Arnulfo Crossing, Botsfordborough");
  const [region, setRegion] = useState({
    latitude: 40.6782,
    longitude: -73.9442,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 40.6782,
    longitude: -73.9442,
  });

  const getTitle = () => {
    switch (addressType) {
      case "home":
        return "Add Home";
      case "work":
        return "Add Work";
      default:
        return "Add New Address";
    }
  };

  const getButtonTitle = () => {
    switch (addressType) {
      case "home":
        return "Confirm Home";
      case "work":
        return "Confirm Work";
      default:
        return "Confirm Address";
    }
  };

  const handleConfirm = () => {
    // TODO: Save address logic
    router.back();
  };

  const handleCurrentLocation = () => {
    // TODO: Get current location using expo-location
    // For now, animate to default location
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: 40.6782,
          longitude: -73.9442,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
    // TODO: Reverse geocode to get address
  };

  return (
    <ThemedView style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          initialRegion={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
          mapType="standard"
        >
          <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setMarkerPosition({ latitude, longitude });
            }}
          >
            <View style={styles.customMarker}>
              <Ionicons
                name={
                  addressType === "home"
                    ? "home"
                    : addressType === "work"
                    ? "briefcase"
                    : "location"
                }
                size={scale(24)}
                color={Colors.light.white}
              />
            </View>
          </Marker>
        </MapView>

        {/* Back Button Overlay */}
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>

        {/* Current Location Button */}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleCurrentLocation}
          activeOpacity={0.8}
        >
          <Ionicons
            name="locate"
            size={scale(24)}
            color={Colors.light.mainDarkColor}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Handle Bar */}
        <View style={styles.handleBar} />

        {/* Address Input Card */}
        <View style={styles.addressInputCard}>
          <HomeIcon/>
          <TextInput
            style={styles.addressInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor={Colors.light.grey400}
            multiline
          />
        </View>

        {/* Confirm Button */}
        <PrimaryButton
          onPress={handleConfirm}
          title={getTitle()}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.md,
  },
  backButtonContainer: {
    position: "absolute",
    top: verticalScale(48),
    left: scale(16),
    zIndex: 10,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: scale(16),
    right: scale(16),
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.md,
  },
  bottomSheet: {
    backgroundColor: Colors.light.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    paddingHorizontal: scale(20),
    paddingTop: scale(12),
    paddingBottom: scale(32),
    ...Shadows.xl,
  },
  handleBar: {
    width: scale(40),
    height: scale(4),
    backgroundColor: Colors.light.grey200,
    borderRadius: scale(2),
    alignSelf: "center",
    marginBottom: scale(20),
  },
  addressInputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.scaffold,
    borderRadius: scale(100),
    gap: scale(8),
    padding: scale(16),
    marginBottom: scale(16),
  },
  addressIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  addressInput: {
    flex: 1,
    fontSize: moderateScale(15),
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    paddingVertical: 0,
  },
  confirmButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: scale(16),
    paddingVertical: scale(16),
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.button,
  },
  confirmButtonText: {
    fontSize: moderateScale(17),
    fontFamily: AeonikFonts.bold,
    color: Colors.light.white,
  },
});
