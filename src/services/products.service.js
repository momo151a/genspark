import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export const productsService = {
  /**
   * Get all products
   */
  async getAllProducts() {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Get all products error:', error);
      throw error;
    }
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId) {
    try {
      const q = query(
        collection(db, 'products'),
        where('categoryId', '==', categoryId),
        orderBy('displayOrder', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Get products by category error:', error);
      throw error;
    }
  },

  /**
   * Get a single product by ID
   */
  async getProduct(productId) {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      if (productDoc.exists()) {
        return { id: productDoc.id, ...productDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  },

  /**
   * Get a product by slug
   */
  async getProductBySlug(slug) {
    try {
      const q = query(
        collection(db, 'products'),
        where('slug', '==', slug)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Get product by slug error:', error);
      throw error;
    }
  },

  /**
   * Get all categories
   */
  async getAllCategories() {
    try {
      const q = query(
        collection(db, 'categories'),
        orderBy('displayOrder', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  },

  /**
   * Get a single category
   */
  async getCategory(categoryId) {
    try {
      const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
      if (categoryDoc.exists()) {
        return { id: categoryDoc.id, ...categoryDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Get category error:', error);
      throw error;
    }
  }
};
