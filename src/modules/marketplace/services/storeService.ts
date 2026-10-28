import type { Store } from '../types';
import { stores } from '../../../mocks/catalog';
import { delay, readDb, updateDb } from '../../../lib/mockDb';

export const getStores = (): Promise<Store[]> => delay([...stores].sort((a, b) => b.followers - a.followers));

export const getStoreById = (id: string): Promise<Store | undefined> => delay(stores.find((s) => s.id === id));

export const isFollowingStore = (userId: string, storeId: string): boolean =>
    readDb().follows.some((f) => f.userId === userId && f.storeId === storeId);

export const toggleFollowStore = (userId: string, storeId: string): Promise<boolean> => {
    const following = isFollowingStore(userId, storeId);
    updateDb((db) => ({
        ...db,
        follows: following
            ? db.follows.filter((f) => !(f.userId === userId && f.storeId === storeId))
            : [...db.follows, { userId, storeId }],
    }));
    return delay(!following, 150);
};
