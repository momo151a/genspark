import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const authService = {
  /**
   * Register a new user
   */
  async register(email, password, name, age) {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name and avatar
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl
      });

      // Create Firestore user document
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        age,
        avatarUrl,
        bio: '',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId, updates) {
    try {
      const userRef = doc(db, 'users', userId);

      // Update Firestore document
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date()
      });

      // Update Firebase Auth profile if name or avatar changed
      if (updates.name || updates.avatarUrl) {
        const authUpdates = {};
        if (updates.name) authUpdates.displayName = updates.name;
        if (updates.avatarUrl) authUpdates.photoURL = updates.avatarUrl;
        await updateProfile(auth.currentUser, authUpdates);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update password
   */
  async changePassword(newPassword) {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }
};
