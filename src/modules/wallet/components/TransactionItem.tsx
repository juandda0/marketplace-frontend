import type { IconType } from 'react-icons';
import { PiArrowDownLeft, PiArrowsClockwise, PiGavel, PiGift, PiShoppingBagOpen, PiStorefront, PiTicket } from 'react-icons/pi';
import type { TransactionType, WalletTransaction } from '../types';
import { CoinAmount } from '../../../core/ui/Unicoin';
import { formatRelative } from '../../../core/utils/format';

const typeStyles: Record<TransactionType, { icon: IconType; className: string }> = {
    recharge: { icon: PiArrowDownLeft, className: 'bg-success-soft text-success-ink' },
    sale: { icon: PiStorefront, className: 'bg-success-soft text-success-ink' },
    reward: { icon: PiGift, className: 'bg-coin-soft text-coin-ink' },
    refund: { icon: PiArrowsClockwise, className: 'bg-surface-3 text-muted' },
    purchase: { icon: PiShoppingBagOpen, className: 'bg-surface-3 text-fg' },
    bid: { icon: PiGavel, className: 'bg-auction-soft text-auction-ink' },
    raffle: { icon: PiTicket, className: 'bg-raffle-soft text-raffle-ink' },
};

const TransactionItem = ({ tx }: { tx: WalletTransaction }) => {
    const { icon: Icon, className } = typeStyles[tx.type];
    return (
        <li className="flex items-center gap-3 px-4 py-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${className}`}>
                <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-fg">{tx.title}</p>
                {tx.subtitle && <p className="truncate text-xs text-subtle">{tx.subtitle}</p>}
            </div>
            <div className="flex shrink-0 flex-col items-end">
                <CoinAmount
                    amount={tx.amount}
                    signed
                    suffix
                    iconClassName="hidden"
                    className={`text-[14px] font-semibold ${tx.amount > 0 ? 'text-success-ink' : 'text-fg'}`}
                />
                <span className="text-[11px] text-subtle">{formatRelative(tx.createdAt)}</span>
            </div>
        </li>
    );
};

export default TransactionItem;
