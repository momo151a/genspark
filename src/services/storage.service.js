import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const storageService = {
  /**
   * Upload review image
   */
  async uploadReviewImage(file, reviewId) {
    try {
      // Create unique filename with timestamp
      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `reviews/${reviewId}/${filename}`);

      // Upload file with metadata
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type
      });

      // Get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Upload review image error:', error);
      throw error;
    }
  },

  /**
   * Upload avatar image
   */
  async uploadAvatar(file, userId) {
    try {
      const storageRef = ref(storage, `avatars/${userId}/avatar.jpg`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type
      });

      // Get download URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error('Upload avatar error:', error);
      throw error;
    }
  },

  /**
   * Delete image from storage
   */
  async deleteImage(imageUrl) {
    try {
      // Extract path from URL
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Delete image error:', error);
      throw error;
    }
  },

  /**
   * Compress and validate image before upload
   */
  validateImage(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPEG, PNG, or WebP images.');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB. Please choose a smaller image.');
    }

    return true;
  }
};
