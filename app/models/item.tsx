import { Timestamp } from 'firebase/firestore';

export type ItemStatus = 'pending' | 'approved' | 'swapped' | 'rejected';
export type ItemCategory = 'Men' | 'Women' | 'Kids' | 'Unisex';
export type ItemCondition = 'New' | 'Like New' | 'Gently Used' | 'Worn';

export interface Item {
  userId: string; // Firebase UID or Firestore doc ID
  title: string; // Required, Max 150 characters
  description?: string;
  category: ItemCategory;
  type: string; // e.g., T-shirt, Jeans
  size: string; // e.g., S, M, L, XL
  condition: ItemCondition;
  tags?: string[];
  imageUrls: string[]; // Required
  status: ItemStatus; // default = 'pending'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
