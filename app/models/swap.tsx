import { Timestamp } from 'firebase/firestore';

export type SwapType = 'direct' | 'points';
export type SwapStatus = 'requested' | 'accepted' | 'completed' | 'cancelled';

export interface Swap {
  itemId: string; // Firestore document ID of the Item
  fromUserId: string; // UID of the user initiating the swap
  toUserId?: string; // UID of the recipient (optional for redemption-based swap)
  type: SwapType; // 'direct' or 'points'
  status: SwapStatus; // default = 'requested'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
