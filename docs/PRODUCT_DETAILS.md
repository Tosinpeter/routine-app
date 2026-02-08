# Product Details Screen

## Overview

The Product Details screen displays comprehensive information about a skincare product, including images, descriptions, usage instructions, and important warnings. The screen follows a clean, modern design with expandable sections and color-coded information cards.

## File Location

- **Main Screen**: `app/product-details.tsx`
- **Components**: `components/product/`

## Components

### 1. ProductImageCard

Displays the product image in a clean white card with shadow.

**Props:**
- `source`: ImageSourcePropType - The product image source
- `imageStyle?`: object - Optional custom styles for the image

**Usage:**
```tsx
<ProductImageCard
  source={require("@/assets/images/product-placeholder.png")}
/>
```

### 2. ProductHeader

Shows the product brand, name, and category tags.

**Props:**
- `brandName`: string - The brand name (e.g., "Dermatologica")
- `productName`: string - The product name (e.g., "Rapid Reveal Peel")
- `tags`: string[] - Array of category tags (e.g., ["Exfoliant", "Normal"])

**Usage:**
```tsx
<ProductHeader
  brandName="Dermatologica"
  productName="Rapid Reveal Peel"
  tags={["Exfoliant", "Normal"]}
/>
```

### 3. ExpandableSection

A collapsible section with an icon, title, and content area.

**Props:**
- `title`: string - Section title
- `icon`: string - Ionicons icon name
- `iconColor`: string - Icon color (hex)
- `iconBgColor`: string - Icon background color (hex)
- `children`: React.ReactNode - Section content
- `defaultExpanded?`: boolean - Whether section starts expanded (default: false)

**Usage:**
```tsx
<ExpandableSection
  title="Description"
  icon="information-circle-outline"
  iconColor="#F79009"
  iconBgColor="#FEF0C7"
>
  <Text>Product description...</Text>
</ExpandableSection>
```

### 4. InfoCard

A colored information card with an icon, title, and content.

**Props:**
- `title`: string - Card title
- `icon`: string - Ionicons icon name
- `iconColor`: string - Icon and title color (hex)
- `backgroundColor`: string - Card background color (hex)
- `borderColor`: string - Card border color (hex)
- `textColor?`: string - Optional text color for content (hex)
- `children`: React.ReactNode - Card content

**Usage:**
```tsx
<InfoCard
  title="Doctor's Notes"
  icon="document-text-outline"
  iconColor="#079455"
  backgroundColor="#ECFDF3"
  borderColor="#D1FADF"
  textColor="#079455"
>
  <Text>Important medical information...</Text>
</InfoCard>
```

## Screen Sections

### 1. Header
- Back button (left)
- "Product Details" title (center)
- Empty space for visual balance (right)

### 2. Product Image Card
- Large product image
- White background with shadow
- 200x200 scaled dimensions

### 3. Product Information
- Brand name (gray, small text)
- Product name (bold, large text)
- Category tags (pill-shaped badges)

### 4. Expandable Sections

#### Description
- **Icon**: Information circle (orange)
- **Content**: Product description text
- **Default**: Collapsed

#### How to Use
- **Icon**: Checkmark circle (green)
- **Content**: 
  - Before/After comparison image with play button
  - Step-by-step instructions
- **Default**: Expanded

#### Product Details
- **Icon**: Cube (purple)
- **Content**: Key-value pairs for product specifications
- **Default**: Collapsed

### 5. Information Cards

#### Doctor's Notes
- **Color**: Green theme (#079455)
- **Background**: Light green (#ECFDF3)
- **Icon**: Document
- **Content**: Medical advice or notes from dermatologist

#### Important Warnings
- **Color**: Red theme (#F04438)
- **Background**: Light red (#FEF3F2)
- **Icon**: Warning
- **Content**: Bullet list of safety warnings

## Color Scheme

### Section Icons
- **Information (Orange)**: `#F79009` on `#FEF0C7`
- **Success (Green)**: `#17B26A` on `#D1FADF`
- **Cube (Purple)**: `#7C3AED` on `#F4F3FF`

### Info Cards
- **Doctor's Notes**: Green (`#079455` on `#ECFDF3`)
- **Warnings**: Red (`#F04438` on `#FEF3F2`)

## Layout Specifications

- **Container padding**: 20px horizontal
- **Card spacing**: 12px vertical margin
- **Border radius**: 12px for cards, 16px for main image
- **Section padding**: 16px
- **Icon size**: 16px (sections), 20px (info cards)
- **Icon container**: 32x32 with 8px border radius

## Before/After Component

The "How to Use" section includes a before/after comparison feature:

- **Container**: 2:1 aspect ratio
- **Image**: Comparison face image
- **Badges**: "Before" and "After" labels positioned at top-left and top-right
- **Play Button**: Centered orange circular button with play icon
- **Badge style**: Dark semi-transparent background with white text

## Customization

### Adding New Sections

```tsx
<ExpandableSection
  title="Your Section Title"
  icon="your-icon-name"
  iconColor="#HEX_COLOR"
  iconBgColor="#HEX_BG_COLOR"
  defaultExpanded={false}
>
  {/* Your content */}
</ExpandableSection>
```

### Adding New Info Cards

```tsx
<InfoCard
  title="Your Card Title"
  icon="your-icon-name"
  iconColor="#HEX_COLOR"
  backgroundColor="#HEX_BG"
  borderColor="#HEX_BORDER"
  textColor="#HEX_TEXT"
>
  {/* Your content */}
</InfoCard>
```

## Integration

The screen is automatically integrated with the Routine page. When users tap a product card or the "View" button, they're navigated to this screen.

### Navigation with Product Data

Navigate to the screen programmatically with a product ID:

```tsx
import { router } from 'expo-router';

router.push({
  pathname: '/product-details',
  params: { productId: 'p1' }
});
```

### Accessing Product Data

The screen fetches product data from Redux store using the provided `productId`:

```tsx
const params = useLocalSearchParams();
const productId = params.productId as string;

const product = useAppSelector((state) =>
  state.home.routineSteps
    .map((step) => step.product)
    .find((p) => p.id === productId)
);
```

## Dynamic Product Data

The screen now supports dynamic product data through route parameters:

### Product Data Structure

```tsx
interface RoutineProduct {
  id: string;
  brand: string;
  name: string;
  period: string;
  isCompleted: boolean;
  needsLabTest?: boolean;
  progress: number;
  image?: string;
  tags?: string[];
  description?: string;
  instructions?: string[];
  details?: { label: string; value: string }[];
  doctorNotes?: string;
  warnings?: string[];
}
```

### Conditional Rendering

All sections are conditionally rendered based on available data:
- If `description` is missing, the Description section won't appear
- If `instructions` is empty, the How to Use section won't appear
- If `details` is empty, the Product Details section won't appear
- If `doctorNotes` is missing, the Doctor's Notes card won't appear
- If `warnings` is empty, the Warnings card won't appear

This ensures the screen gracefully handles incomplete product data.

## Dependencies

- `react-native`: Core React Native components
- `react-native-safe-area-context`: SafeAreaView for safe area handling
- `@expo/vector-icons`: Ionicons for icons
- `expo-router`: Navigation (if using router.back())

## Styling System

The screen uses the app's consistent styling system:
- **Scaling**: `scale()` and `verticalScale()` for responsive sizing
- **Fonts**: Custom fonts from `@/constants/theme`
- **Colors**: Theme colors from `@/constants/theme`
- **Shadows**: Predefined shadow styles from `@/constants/theme`

## Accessibility

- Touch targets meet minimum size requirements (44pt iOS, 48dp Android)
- Text uses appropriate contrast ratios
- All interactive elements have `activeOpacity` for visual feedback
- Semantic structure with proper heading hierarchy

## Performance Considerations

- Images use `resizeMode="contain"` for proper scaling
- ScrollView has `showsVerticalScrollIndicator={false}` for cleaner UI
- Components are memoizable for optimization if needed
- Expandable sections only render content when expanded
