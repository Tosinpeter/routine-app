# Internationalization (i18n) Setup

This app uses `i18n-js` and `expo-localization` for multi-language support.

## Supported Languages

- **English (en)** - United States (default)
- **Arabic (ar)** - Saudi Arabia, Qatar
- **Japanese (ja)** - Japan
- **French (fr)** - Canada

## File Structure

```
i18n/
├── index.ts              # i18n configuration and exports
├── locales/
│   ├── en.json          # English translations
│   ├── ar.json          # Arabic translations
│   ├── ja.json          # Japanese translations
│   └── fr.json          # French translations
└── README.md            # This file
```

## Usage

### Basic Translation

```tsx
import i18n from '@/i18n';

// In component
const text = i18n.t('home.greetings.morning'); // Returns: "Morning"
```

### Using the AppDataProvider (Recommended)

```tsx
import { useTranslation } from '@/contexts/AppDataProvider';

function MyComponent() {
  const { t, currentLanguage } = useTranslation();
  
  return (
    <View>
      <Text>{t('home.greetings.morning')}</Text>
      <Text>Current language: {currentLanguage}</Text>
    </View>
  );
}
```

For full app state access:

```tsx
import { useAppData } from '@/contexts/AppDataProvider';

function MyComponent() {
  const { t, currentLanguage, changeLanguage } = useAppData();
  
  return (
    <View>
      <Text>{t('home.greetings.morning')}</Text>
      <Button onPress={() => changeLanguage('ar')}>Switch to Arabic</Button>
    </View>
  );
}
```

### With Variables

```tsx
const text = i18n.t('routineStep.period', { period: '2 weeks' });
// Returns: "Period: 2 weeks"
```

## Adding New Translations

1. Add the key-value pair to `en.json` first (this is the default/fallback language)
2. Add corresponding translations to other language files (`ar.json`, `ja.json`, `fr.json`)
3. Use the same nested structure in all files

Example:

```json
// en.json
{
  "common": {
    "welcome": "Welcome"
  }
}

// ar.json
{
  "common": {
    "welcome": "مرحبا"
  }
}
```

## Adding a New Language

1. Create a new JSON file in `i18n/locales/` (e.g., `es.json`)
2. Copy the structure from `en.json` and translate all values
3. Import and add it to `i18n/index.ts`:

```typescript
import es from "./locales/es.json";

const i18n = new I18n({
  en,
  ar,
  ja,
  fr,
  es, // Add new language
});
```

4. Add the language option to the Language selection screen

## Language Selection

Users can change the app language from:
- **Profile > Setting > Language**

The language preference is persisted across app restarts using AsyncStorage.

### How It Works

1. User selects a language from the Language page
2. Selection is saved to AsyncStorage (`@routine_app:language`)
3. App state updates via AppDataProvider
4. All UI components re-render with new translations
5. On app restart, saved language is automatically loaded

## RTL Support

For RTL languages like Arabic, additional RTL layout support may be needed using:
- `expo-localization` - provides RTL detection
- `I18nManager` from React Native - for RTL layout

## Testing Different Languages

To test different languages during development:

```typescript
import i18n from '@/i18n';

// Change language programmatically
i18n.locale = 'ar'; // Arabic
i18n.locale = 'ja'; // Japanese
i18n.locale = 'fr'; // French
```

## Translation Keys Reference

### Common Sections

- `home.*` - Home screen translations
- `profile.*` - Profile and menu items
- `language.*` - Language selection screen
- `permissions.*` - Permissions screen
- `routineStep.*` - Routine step related
- `upload.*` - File upload screen
- `selectLabTest.*` - Lab test selection
- `days.*` - Day names (abbreviations)
- `months.*` - Month names

## Best Practices

1. **Always use translation keys** instead of hardcoded strings
2. **Keep keys descriptive** - use nested objects for organization
3. **Add new keys to all language files** to avoid missing translations
4. **Use variables** for dynamic content (e.g., dates, names, numbers)
5. **Test all languages** before releasing features
6. **Consider context** - some words have different meanings in different contexts

## Future Enhancements

- [x] ~~Implement AsyncStorage persistence for language selection~~ ✅ DONE
- [ ] Add RTL layout support for Arabic
- [ ] Add more languages based on user demand
- [ ] Localize remaining app screens (Home, Routine, Upload, etc.)
- [ ] Add language switching animation/transition
- [ ] Implement pluralization for languages that need it
- [ ] Add professional translation review
