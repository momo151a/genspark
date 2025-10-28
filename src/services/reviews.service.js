import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  onSnapshot,
  increment,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';

export const reviewsService = {
  /**
   * Create a new review
   */
  async createReview(reviewData) {
    try {
      const reviewsRef = collection(db, 'reviews');
      const docRef = await addDoc(reviewsRef, {
        ...reviewData,
        likesCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Create review error:', error);
      throw error;
    }
  },

  /**
   * Get reviews with filters (one-time fetch)
   */
  async getReviews(filters = {}) {
    try {
      let q = collection(db, 'reviews');
      const conditions = [];

      // Apply filters
      if (filters.productId) {
        conditions.push(where('productId', '==', filters.productId));
      }
      if (filters.userId) {
        conditions.push(where('userId', '==', filters.userId));
      }

      // Apply sorting
      let orderByField = 'createdAt';
      if (filters.sortBy === 'popular') orderByField = 'likesCount';
      if (filters.sortBy === 'rating') orderByField = 'rating';
      conditions.push(orderBy(orderByField, 'desc'));

      // Apply limit
      if (filters.limit) {
        conditions.push(limit(filters.limit));
      }

      q = query(q, ...conditions);

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Get reviews error:', error);
      throw error;
    }
  },

  /**
   * Subscribe to reviews with real-time updates
   */
  subscribeToReviews(filters = {}, callback) {
    try {
      let q = collection(db, 'reviews');
      const conditions = [];

      // Apply filters
      if (filters.productId) {
        conditions.push(where('productId', '==', filters.productId));
      }
      if (filters.userId) {
        conditions.push(where('userId', '==', filters.userId));
      }

      // Apply sorting
      let orderByField = 'createdAt';
      if (filters.sortBy === 'popular') orderByField = 'likesCount';
      if (filters.sortBy === 'rating') orderByField = 'rating';
      conditions.push(orderBy(orderByField, 'desc'));

      // Apply limit
      if (filters.limit) {
        conditions.push(limit(filters.limit));
      }

      q = query(q, ...conditions);

      // Subscribe to real-time updates
      return onSnapshot(q, (snapshot) => {
        const reviews = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(reviews);
      });
    } catch (error) {
      console.error('Subscribe reviews error:', error);
      throw error;
    }
  },

  /**
   * Get a single review by ID
   */
  async getReview(reviewId) {
    try {
      const reviewDoc = await getDoc(doc(db, 'reviews', reviewId));
      if (reviewDoc.exists()) {
        return { id: reviewDoc.id, ...reviewDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Get review error:', error);
      throw error;
    }
  },

  /**
   * Update a review
   */
  async updateReview(reviewId, updates) {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Update review error:', error);
      throw error;
    }
  },

  /**
   * Delete a review
   */
  async deleteReview(reviewId) {
    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      await deleteDoc(reviewRef);
    } catch (error) {
      console.error('Delete review error:', error);
      throw error;
    }
  },

  /**
   * Toggle like on a review
   */
  async toggleLike(reviewId, userId) {
    try {
      const likeId = `${userId}_${reviewId}`;
      const likeRef = doc(db, 'likes', likeId);
      const likeDoc = await getDoc(likeRef);

      const reviewRef = doc(db, 'reviews', reviewId);

      if (likeDoc.exists()) {
        // Unlike: Remove like document and decrement count
        await deleteDoc(likeRef);
        await updateDoc(reviewRef, {
          likesCount: increment(-1)
        });
        return false; // unliked
      } else {
        // Like: Create like document and increment count
        await setDoc(likeRef, {
          userId,
          reviewId,
          createdAt: new Date()
        });
        await updateDoc(reviewRef, {
          likesCount: increment(1)
        });
        return true; // liked
      }
    } catch (error) {
      console.error('Toggle like error:', error);
      throw error;
    }
  },

  /**
   * Check if user has liked a review
   */
  async checkLikeStatus(reviewId, userId) {
    try {
      const likeId = `${userId}_${reviewId}`;
      const likeRef = doc(db, 'likes', likeId);
      const likeDoc = await getDoc(likeRef);
      return likeDoc.exists();
    } catch (error) {
      console.error('Check like status error:', error);
      throw error;
    }
  },

  /**
   * Get user's liked reviews
   */
  async getUserLikes(userId) {
    try {
      const q = query(
        collection(db, 'likes'),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data().reviewId);
    } catch (error) {
      console.error('Get user likes error:', error);
      throw error;
    }
  }
};
