import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText as Text } from "@/components/app-text";
import { BackButton } from "@/components/back-button";
import { CheckboxIcon, FileIcon, TrashIcon, UploadCloudIcon } from "@/components/icons";
import { ThemedView } from "@/components/themed-view";
import { PrimaryButton } from "@/components/primary-button";
import {
  moderateScale,
  scale,
  scaledRadius,
  scaleIcon,
  touchTarget,
  verticalScale,
} from "@/constants/scaling";
import { AeonikFonts, BorderRadius, Colors, Fonts, HitSlop } from "@/constants/theme";
import { AppTextStyle } from "@/constants/typography";
import { useAuth } from "@/contexts/AuthContext";
import { useFileUpload } from "@/hooks/use-file-upload";
import { t } from "@/i18n";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i];
}

interface UploadingItem {
  key: string;
  name: string;
  sizeBytes: number;
  progress: number;
}

export default function UploadScreen() {
  const { profile } = useAuth();
  const userId = profile?.id ?? undefined;
  const {
    files,
    error: uploadError,
    uploadFile,
    fetchFiles,
    deleteFile,
  } = useFileUpload();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingItem[]>([]);

  useEffect(() => {
    if (userId) {
      fetchFiles(userId);
    }
  }, [userId, fetchFiles]);

  const handlePickDocument = async () => {
    if (!userId) return;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        const now = Date.now();
        const newItems: UploadingItem[] = result.assets.map((asset, i) => ({
          key: `upload-${now}-${i}`,
          name: asset.name,
          sizeBytes: asset.size ?? 0,
          progress: 0,
        }));
        setUploadingFiles((prev) => [...prev, ...newItems]);

        for (let i = 0; i < result.assets.length; i++) {
          const asset = result.assets[i];
          const itemKey = newItems[i].key;
          try {
            await uploadFile(
              {
                uri: asset.uri,
                name: asset.name,
                mimeType: asset.mimeType ?? "application/octet-stream",
                size: asset.size,
              },
              userId,
              {
                onProgress: (percent) => {
                  setUploadingFiles((prev) =>
                    prev.map((f) =>
                      f.key === itemKey ? { ...f, progress: percent } : f,
                    ),
                  );
                },
              },
            );
          } finally {
            setUploadingFiles((prev) => prev.filter((f) => f.key !== itemKey));
          }
        }
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    await deleteFile(fileId);
  };

  const handleSubmit = () => {
    router.push("/lab-test/precription-download");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button */}
        <BackButton style={styles.backButton} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t("upload.title")}</Text>
            <Text style={styles.subtitle}>{t("upload.subtitle")}</Text>
          </View>

          {/* Upload Zone */}
          <TouchableOpacity
            style={styles.uploadZone}
            onPress={handlePickDocument}
            activeOpacity={0.8}
          >
            <View style={styles.uploadIconContainer}>
              <UploadCloudIcon
                height={scaleIcon(32)}
                width={scaleIcon(32)}
                color={Colors.light.text}
              />
            </View>
            <Text style={styles.uploadText}>{t("upload.dragAndDrop")}</Text>
            <Text style={styles.browseText}>{t("upload.orBrowse")}</Text>
          </TouchableOpacity>

          {uploadError ? (
            <Text style={styles.errorText}>{uploadError}</Text>
          ) : null}

          {/* File List: uploading first, then completed */}
          <View style={styles.fileList}>
            {uploadingFiles.map((item) => (
              <FileItem
                key={item.key}
                file={{
                  id: item.key,
                  name: item.name,
                  size: formatFileSize(item.sizeBytes),
                  progress: item.progress,
                  isCompleted: false,
                }}
                onDelete={() =>
                  setUploadingFiles((prev) =>
                    prev.filter((f) => f.key !== item.key),
                  )
                }
              />
            ))}
            {files.map((file) => (
              <FileItem
                key={file.id}
                file={{
                  id: file.id,
                  name: file.name,
                  size: formatFileSize(file.size ?? 0),
                  progress: 100,
                  isCompleted: true,
                }}
                onDelete={() => handleDeleteFile(file.id)}
              />
            ))}
          </View>

          <View style={styles.bottomContainer}>
            <PrimaryButton
              onPress={handleSubmit}
              title={t("upload.submit")}
              withShadow
              disabled={files.length === 0 || uploadingFiles.length > 0}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

interface FileItemProps {
  file: {
    id: string;
    name: string;
    size: string;
    progress: number;
    isCompleted: boolean;
  };
  onDelete: () => void;
}

function FileItem({ file, onDelete }: FileItemProps) {
  return (
    <View style={styles.fileItem}>
      <View style={styles.fileInfo}>
        {/* PDF Icon */}
        <View style={styles.pdfIconContainer}>
          <FileIcon width={scaleIcon(40)} height={scaleIcon(40)} />
        </View>

        {/* File Details */}
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{file.name}</Text>
          <Text style={styles.fileSize}>{file.size}</Text>
        </View>

        {/* Status Icon */}
        {file.isCompleted ? (
          <CheckboxIcon backgroundColor={Colors.light.success} checkColor={Colors.light.white} />
        ) : (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.7}
            hitSlop={HitSlop.medium}
          >
            <TrashIcon width={scaleIcon(20)} height={scaleIcon(20)} color={Colors.light.grey600} />
          </TouchableOpacity>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${file.progress}%`,
                backgroundColor: file.isCompleted ? Colors.light.tint : Colors.light.tint,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{file.progress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    marginLeft: scale(16),
  },
  scrollView: {
    padding: scale(16),
    // flex: 1,
  },
  scrollContent: {
    backgroundColor: Colors.light.white,
    paddingHorizontal: scale(16),
    borderRadius: BorderRadius.lg,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
  header: {
    marginBottom: verticalScale(20),
  },
  title: {
    ...AppTextStyle.headline4,
    color: Colors.light.text,
    fontFamily: AeonikFonts.medium,
    marginBottom: verticalScale(12),
  },
  subtitle: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.mainDarkColor,
    lineHeight: moderateScale(22),
  },
  // Upload Zone
  uploadZone: {
    borderWidth: 1.2,
    borderColor: Colors.light.lightGrey300,
    borderStyle: "dashed",
    borderRadius: BorderRadius.lg,
    paddingVertical: verticalScale(40),
    paddingHorizontal: scale(24),
    alignItems: "center",
    backgroundColor: Colors.light.scaffold,
    marginBottom: verticalScale(16),
  },
  uploadIconContainer: {
    marginBottom: verticalScale(16),
  },
  uploadText: {
    ...AppTextStyle.bodyText1,
    color: Colors.light.mainDarkColor,
    fontFamily: AeonikFonts.regular,
    marginBottom: verticalScale(10),
  },
  browseText: {
    ...AppTextStyle.labelMedium,
    fontFamily: AeonikFonts.medium,
    color: Colors.light.text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.text,
    paddingBottom: 1,
  },
  // File List
  fileList: {
    gap: scale(8),
  },
  fileItem: {
    backgroundColor: Colors.light.white,
    borderRadius: BorderRadius.md,
    padding: scale(16),
    borderColor: Colors.light.grey200,
    borderWidth: 1,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(12),
  },
  pdfIconContainer: {
    marginRight: scale(12),
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    ...AppTextStyle.bodyText1,
    fontFamily: AeonikFonts.regular,
    color: Colors.light.text,
    marginBottom: verticalScale(2),
  },
  fileSize: {
    ...AppTextStyle.bodyText2,
    color: Colors.light.grey500,
  },
  checkmarkContainer: {
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.successLight,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: touchTarget(20),
    minHeight: touchTarget(20),
  },
  // Progress Bar
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  progressBarBackground: {
    flex: 1,
    height: verticalScale(6),
    backgroundColor: Colors.light.grey200,
    borderRadius: scaledRadius(3),
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: scaledRadius(3),
  },
  progressText: {
    ...AppTextStyle.bodyText2,
    fontFamily: Fonts.medium,
    color: Colors.light.grey500,
    minWidth: scale(36),
    textAlign: "right",
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  // Bottom Container
  bottomContainer: {
    paddingTop: verticalScale(16),
  },
  errorText: {
    ...AppTextStyle.bodyText2,
    color: Colors.light.grey700,
    marginBottom: verticalScale(8),
  },
});
