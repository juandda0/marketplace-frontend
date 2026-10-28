import type { Auction, AuctionStatus, AuctionView, Bid } from '../types';
import { auctions } from '../../../mocks/auctions';
import { delay, MockApiError, readDb, uid, updateDb } from '../../../lib/mockDb';
import { getBalanceSync } from '../../wallet/services/walletService';
import { formatNumber } from '../../../core/utils/format';

const ENDING_SOON_MS = 60 * 60_000;

export const auctionStatus = (endsAt: number, now = Date.now()): AuctionStatus => {
    if (endsAt <= now) return 'ended';
    if (endsAt - now < ENDING_SOON_MS) return 'ending';
    return 'live';
};

const toView = (auction: Auction): AuctionView => {
    const localBids = readDb().bids.filter((b) => b.auctionId === auction.id);
    const bids = [...localBids, ...auction.bids].sort((a, b) => b.amount - a.amount || b.createdAt - a.createdAt);
    const leader = bids[0];
    return {
        ...auction,
        bids,
        leader,
        currentBid: leader?.amount ?? auction.startingBid,
        status: auctionStatus(auction.endsAt),
    };
};

/** Monto mínimo para la siguiente puja. */
export const minimumBid = (auction: AuctionView): number =>
    auction.bids.length ? auction.currentBid + auction.minIncrement : auction.startingBid;

export const getAuctions = (): Promise<AuctionView[]> =>
    delay(
        auctions.map(toView).sort((a, b) => {
            // Activas primero, ordenadas por las que terminan antes.
            if ((a.status === 'ended') !== (b.status === 'ended')) return a.status === 'ended' ? 1 : -1;
            return a.endsAt - b.endsAt;
        }),
    );

export const getAuctionById = (id: number): Promise<AuctionView | undefined> => {
    const found = auctions.find((a) => a.id === id);
    return delay(found ? toView(found) : undefined);
};

export const placeBid = async (
    auctionId: number,
    amount: number,
    user: { id: string; displayName: string },
): Promise<AuctionView> => {
    await delay(null, 500);
    const base = auctions.find((a) => a.id === auctionId);
    if (!base) throw new MockApiError('La subasta no existe.');
    const auction = toView(base);
    if (auction.status === 'ended') throw new MockApiError('Esta subasta ya finalizó.');
    const min = minimumBid(auction);
    if (!Number.isFinite(amount) || amount < min) {
        throw new MockApiError(`La puja mínima es de ${formatNumber(min)} UNICOIN.`);
    }
    if (auction.leader?.userId === user.id) throw new MockApiError('Ya vas ganando esta subasta.');
    if (amount > getBalanceSync(user.id)) {
        throw new MockApiError('Tu saldo de UNICOIN no alcanza para esta puja. Recarga tu billetera.');
    }
    const bid: Bid = {
        id: uid('bid'),
        auctionId,
        bidderName: user.displayName,
        userId: user.id,
        amount,
        createdAt: Date.now(),
    };
    updateDb((db) => ({ ...db, bids: [bid, ...db.bids] }));
    return toView(base);
};

export interface UserBidSummary {
    auction: AuctionView;
    myBestBid: number;
    isLeading: boolean;
}

export const getUserBids = (userId: string): Promise<UserBidSummary[]> =>
    delay(
        auctions
            .map(toView)
            .map((auction) => {
                const mine = auction.bids.filter((b) => b.userId === userId);
                if (!mine.length) return null;
                return {
                    auction,
                    myBestBid: Math.max(...mine.map((b) => b.amount)),
                    isLeading: auction.leader?.userId === userId,
                };
            })
            .filter((x): x is UserBidSummary => x !== null),
    );
