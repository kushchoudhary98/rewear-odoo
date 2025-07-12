import { Timestamp } from 'firebase/firestore';

export type UserRole = 'user' | 'admin';

export interface User {
  userId: string; // Firebase UID
  firstName: string; // Required, Min: 3, Max: 20
  lastName: string; // Optional, Min: 3, Max: 20
  emailId: string; // Required, unique, lowercase, immutable
  age: number; // Optional, Min: 6, Max: 80
  points: number; // Default: 50
  role: UserRole; // Default: 'user'
  cart: string[]; // Item IDs to redeem/buy
  soldItems: string[]; // Items given away
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
