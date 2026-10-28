import type { Visual } from '../../../core/ui/visualIcons';
import type { CategorySlug } from '../../marketplace/types';

export interface Bid {
    id: string;
    auctionId: number;
    bidderName: string;
    userId?: string;
    /** Monto en UNICOIN. */
    amount: number;
    createdAt: number;
}

export interface Auction {
    id: number;
    title: string;
    description: string;
    category: CategorySlug;
    condition: 'Nuevo' | 'Como nuevo' | 'Usado';
    visual: Visual;
    imageUrl?: string;
    storeId: string;
    storeName: string;
    /** Montos en UNICOIN. */
    startingBid: number;
    minIncrement: number;
    endsAt: number;
    watchers: number;
    /** Ordenadas de la más alta a la más baja. */
    bids: Bid[];
}

export type AuctionStatus = 'live' | 'ending' | 'ended';

export interface AuctionView extends Auction {
    currentBid: number;
    status: AuctionStatus;
    leader?: Bid;
}
