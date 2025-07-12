import { Timestamp } from 'firebase/firestore';

export type ItemStatus = 'pending' | 'approved' | 'swapped' | 'rejected';
export type ItemCategory = 'Men' | 'Women' | 'Kids' | 'Unisex';
export type ItemCondition = 'New' | 'Excellent' | 'Moderately Used' | 'Worn';
export type ItemSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Item {
  itemId: string; // Firebase UID or Firestore doc ID
  title: string; // Required, Max 150 characters
  description: string; // Required
  category: ItemCategory;
  type: string; // e.g., T-shirt, Jeans
  size: ItemSize;
  condition: ItemCondition;
  imageUrls: string[]; // Required
  status: ItemStatus; // default = 'pending'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
