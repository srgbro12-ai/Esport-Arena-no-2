'use client';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
} from 'firebase/storage';
import { FirebaseApp } from 'firebase/app';

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param app - The initialized FirebaseApp instance.
 * @param file - The file to upload.
 * @param path - The path in Firebase Storage where the file should be saved (e.g., 'avatars/user123.jpg').
 * @returns A promise that resolves with the public download URL of the uploaded file.
 */
export async function uploadFile(
  app: FirebaseApp,
  file: File,
  path: string
): Promise<string> {
  const storage: FirebaseStorage = getStorage(app);
  const storageRef = ref(storage, path);

  try {
    // Upload the file to the specified path.
    const snapshot = await uploadBytes(storageRef, file);
    // Get the public URL of the uploaded file.
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    // Re-throw the error to be handled by the caller.
    throw new Error(`Failed to upload file: ${(error as Error).message}`);
  }
}
