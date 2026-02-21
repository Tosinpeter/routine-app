import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, verticalScale } from '@/constants/scaling';
import { Colors } from '@/constants/theme';

export default function SkincareScreen() {
  const router = useRouter();

  const screens = [
    { name: 'Onboarding', route: '/onboarding' },
    { name: 'Phone Verification', route: '/auth/phone-verification' },
    { name: 'OTP Verification', route: '/auth/otp-verification' },
    { name: 'Start Analysis', route: '/start-analysis' },
    { name: 'Photo Preparation', route: '/photo-prep' },
    { name: 'Quiz', route: '/quiz' },
    { name: 'Quiz Questions', route: '/quiz/questions' },
    { name: 'Quiz Complete', route: '/quiz/complete' },
    { name: 'Product Details', route: '/product-details' },
    { name: 'Payment Checkout', route: '/payment' },
    { name: 'Delivery Form', route: '/payment/delivery-form' },
    { name: 'Checkout Summary', route: '/payment/checkout-summary' },
    { name: 'Order History', route: '/order/history' },
    { name: 'Order Details', route: '/order/details' },
    { name: 'Profile Details', route: '/profile/profile-details' },
    { name: 'Saved Addresses', route: '/profile/saved-address' },
    { name: 'Add Address', route: '/profile/saved-address/add-address' },
    { name: 'Support', route: '/profile/support' },
    { name: 'FAQ', route: '/profile/faq' },
    { name: 'Language', route: '/profile/language' },
    { name: 'Permissions', route: '/profile/permissions' },
    { name: 'Terms of Use', route: '/profile/terms-of-use' },
    { name: 'Privacy Policy', route: '/profile/privacy-policy' },
    { name: 'Lab Test', route: '/lab-test' },
    { name: 'Select Lab Test', route: '/select-lab-test' },
    { name: 'Prescription Upload', route: '/lab-test/prescription-upload' },
    { name: 'Prescription Download', route: '/lab-test/precription-download' },
    { name: 'Face Scan History', route: '/face-scan-history' },
    { name: 'Top Improvements', route: '/top-improvements' },
    { name: 'Notification', route: '/notification' },
    { name: 'Notification Sheet', route: '/notification-sheet' },
    { name: 'API Error', route: '/api-error' },
    { name: 'No Branch', route: '/no-branch' },
    { name: 'No Internet', route: '/no-internet' },
    { name: 'Treatment Plan', route: '/treatment-plan' },
    { name: 'Cookie Policy', route: '/cookie-policy' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Screen Testing List</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {screens.map((screen, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => router.push(screen.route as any)}
          >
            <Text style={styles.buttonText}>{screen.name}</Text>
            <Text style={styles.routeText}>{screen.route}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    fontSize: scale(24),
    fontFamily: 'Aeonik-Bold',
    color: Colors.light.grey800,
    padding: scale(20),
    paddingTop: verticalScale(60),
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    gap: scale(12),
  },
  button: {
    backgroundColor: Colors.light.white,
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.light.grey200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: scale(16),
    fontFamily: 'Aeonik-Medium',
    color: Colors.light.grey800,
    marginBottom: scale(4),
  },
  routeText: {
    fontSize: scale(12),
    fontFamily: 'Aeonik-Regular',
    color: Colors.light.grey500,
  },
});
