# Product Linking - Routine to Product Details

## Overview

This document explains how products on the Routine page are linked to the Product Details screen, enabling users to view comprehensive information about each product in their skincare routine.

## Flow

```
Routine Page → Product Card (Tap) → Product Details Screen
             ↓
         View Button (Tap) → Product Details Screen
```

## Implementation

### 1. Data Structure

**Product Interface** (`store/slices/home-slice.ts`)

```typescript
export interface RoutineProduct {
  id: string;                    // Unique identifier
  brand: string;                 // Brand name
  name: string;                  // Product name
  period: string;                // Usage period
  isCompleted: boolean;          // Completion status
  needsLabTest?: boolean;        // Lab test required flag
  progress: number;              // Progress (0-1)
  image?: string;                // Product image
  
  // Extended product details
  tags?: string[];               // Category tags
  description?: string;          // Product description
  instructions?: string[];       // Usage instructions
  details?: Array<{              // Product specifications
    label: string;
    value: string;
  }>;
  doctorNotes?: string;          // Doctor's recommendations
  warnings?: string[];           // Safety warnings
}
```

### 2. Navigation Logic

**RoutineStepCard Component** (`components/routine-step-card.tsx`)

The product card has two interactive elements:

#### A. Entire Product Card (Touchable)
```typescript
const handleProductPress = () => {
  if (product.progress > 0 && !product.needsLabTest) {
    router.push({
      pathname: "/product-details",
      params: { productId: product.id },
    });
  }
};
```

**Conditions for Navigation:**
- ✅ Product progress must be > 0 (unlocked)
- ✅ Product must not require lab test
- ❌ Locked products (progress = 0) are not clickable
- ❌ Lab test products navigate to lab test screen instead

#### B. "View" Button
Located in the `tagsRow` section, this button provides explicit navigation:

```typescript
<TouchableOpacity
  style={styles.viewButton}
  hitSlop={HitSlop.small}
  onPress={handleProductPress}
>
  <Text style={styles.viewButtonText}>{t("routineStep.view")}</Text>
  <Ionicons name="chevron-forward" size={scaleIcon(13)} />
</TouchableOpacity>
```

### 3. Product Details Screen

**Dynamic Data Loading** (`app/product-details.tsx`)

The screen receives the `productId` via route parameters and fetches the product data:

```typescript
const params = useLocalSearchParams();
const productId = params.productId as string;

// Get product from Redux store
const product = useAppSelector((state) =>
  state.home.routineSteps
    .map((step) => step.product)
    .find((p) => p.id === productId)
);
```

**Fallback Handling:**
If the product is not found, a default product is displayed to prevent crashes.

### 4. Conditional Rendering

The product details screen dynamically shows/hides sections based on available data:

```typescript
{displayProduct.description && (
  <ExpandableSection title="Description">
    <Text>{displayProduct.description}</Text>
  </ExpandableSection>
)}

{displayProduct.instructions && displayProduct.instructions.length > 0 && (
  <ExpandableSection title="How to Use">
    {/* Instructions content */}
  </ExpandableSection>
)}

{displayProduct.details && displayProduct.details.length > 0 && (
  <ExpandableSection title="Product Details">
    {/* Details content */}
  </ExpandableSection>
)}

{displayProduct.doctorNotes && (
  <InfoCard title="Doctor's Notes">
    <Text>{displayProduct.doctorNotes}</Text>
  </InfoCard>
)}

{displayProduct.warnings && displayProduct.warnings.length > 0 && (
  <InfoCard title="Important Warnings">
    {/* Warnings list */}
  </InfoCard>
)}
```

## User Experience

### Locked Products (progress = 0)
- ❌ Product card is not clickable
- ❌ "View" button is not shown
- ✅ Lock icon is displayed
- ✅ If lab test required, "Click Here" button navigates to lab test screen

### Unlocked Products (progress > 0)
- ✅ Entire product card is tappable
- ✅ "View" button is shown and functional
- ✅ Both navigate to product details screen
- ✅ Product image is displayed

### Lab Test Required Products
- ❌ Cannot view product details until lab test is completed
- ✅ "Lab Test Required" badge is shown
- ✅ "Click Here" button navigates to `/lab-test` screen
- ⏳ Once lab test is complete, product becomes viewable

## Sample Product Data

Each product in the routine has complete information:

```typescript
{
  id: "p3",
  brand: "Dermatologica",
  name: "Rapid Reveal Peel",
  period: "3month",
  progress: 0.25,
  tags: ["Exfoliant", "Normal"],
  description: "A professional-grade chemical peel...",
  instructions: [
    "Cleanse your face thoroughly",
    "Apply a thin layer avoiding eye area",
    "Leave on for 5-7 minutes",
    "Rinse thoroughly with lukewarm water"
  ],
  details: [
    { label: "Size", value: "50ml" },
    { label: "Key Ingredients", value: "AHA, BHA, Salicylic Acid" },
    { label: "Skin Type", value: "Normal, Oily" }
  ],
  doctorNotes: "Excellent choice for maintaining skin barrier function.",
  warnings: [
    "Avoid contact with eyes",
    "For external use only"
  ]
}
```

## Testing the Integration

### Test Case 1: View Unlocked Product
1. Navigate to Routine tab
2. Find a product with progress > 0 (e.g., "Clean It Zero")
3. Tap the "View" button or the product card
4. ✅ Product Details screen opens with correct product data

### Test Case 2: Locked Product
1. Navigate to Routine tab
2. Find a product with progress = 0
3. Try tapping the product card
4. ✅ Nothing happens (expected behavior)

### Test Case 3: Lab Test Product
1. Navigate to Routine tab
2. Find a product with `needsLabTest: true`
3. Tap "Click Here" button
4. ✅ Navigates to lab test screen (not product details)

### Test Case 4: Different Products
1. View Product 1 details, note the information
2. Go back to routine
3. View Product 2 details
4. ✅ Different information is displayed correctly

## Navigation Routes

| Route | Purpose | Parameters |
|-------|---------|------------|
| `/product-details` | View product information | `productId: string` |
| `/lab-test` | Upload lab test results | None (from lab test button) |

## State Management

Products are stored in Redux state at `state.home.routineSteps[]`:

```typescript
const product = useAppSelector((state) =>
  state.home.routineSteps
    .map((step) => step.product)
    .find((p) => p.id === productId)
);
```

This ensures:
- ✅ Single source of truth
- ✅ Real-time updates if product data changes
- ✅ Consistent data across screens

## Future Enhancements

### Potential Improvements:
1. **Product Images**: Replace placeholder with actual product images
2. **Video Tutorials**: Add video support for "How to Use" section
3. **Reviews**: Add user reviews and ratings
4. **Purchase Link**: Add "Buy Now" or "Reorder" button
5. **Usage Tracking**: Track when user views product details
6. **Favorites**: Allow users to favorite products
7. **Sharing**: Share product details with friends
8. **Deep Linking**: Support deep links to specific products

### API Integration:
When connecting to a backend API:

```typescript
// Fetch product details from API
const { data: product } = useQuery(['product', productId], () =>
  api.getProduct(productId)
);
```

## Troubleshooting

### Product Details Not Showing
**Problem**: Screen is blank or shows fallback product

**Solution**:
1. Check that `productId` is being passed correctly in navigation
2. Verify product exists in Redux store
3. Check console for errors
4. Ensure product has required fields

### Navigation Not Working
**Problem**: Tapping product card does nothing

**Solution**:
1. Verify product progress > 0
2. Check that product doesn't have `needsLabTest: true`
3. Ensure `router.push` is not throwing errors
4. Test with different products

### Missing Sections
**Problem**: Some sections don't appear in product details

**Solution**:
1. Check that product has the required data fields
2. Verify conditional rendering logic
3. Ensure data is not null or undefined
4. Check fallback product has complete data

## Best Practices

1. **Always validate product data** before navigation
2. **Provide visual feedback** when product is clickable
3. **Handle loading states** for API calls
4. **Cache product data** to improve performance
5. **Track user interactions** for analytics
6. **Test with incomplete data** to ensure graceful degradation

## Related Files

- `app/product-details.tsx` - Product details screen
- `components/routine-step-card.tsx` - Routine product card
- `store/slices/home-slice.ts` - Product data structure
- `components/product/` - Reusable product components
- `docs/PRODUCT_DETAILS.md` - Product details screen documentation
