import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const FS = FileSystem as unknown as {
  documentDirectory?: string;
  cacheDirectory?: string;
  downloadAsync: typeof FileSystem.downloadAsync;
};

export type PickedFile = { name: string; uri: string };

export async function pickFile(): Promise<PickedFile | null> {
  if (Platform.OS === 'web') return null;

  const res = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (res.canceled) return null;

  const asset = res.assets?.[0];
  if (!asset) return null;

  return { name: asset.name ?? 'file', uri: asset.uri };
}

export async function downloadDemoFile(): Promise<string | null> {
  if (Platform.OS === 'web') return null;

  const baseDir = FS.documentDirectory ?? FS.cacheDirectory;
  if (!baseDir) return null;

  const url =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  const fileUri = baseDir + 'demo.pdf';
  const res = await FS.downloadAsync(url, fileUri);

  return res.uri;
}

export async function shareFile(uri: string) {
  if (Platform.OS === 'web') return;

  const available = await Sharing.isAvailableAsync();
  if (available) {
    await Sharing.shareAsync(uri);
  }
}
