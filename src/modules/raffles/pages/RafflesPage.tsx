import { useAsync } from '../../../core/hooks/useAsync';
import { getRaffles } from '../services/raffleService';
import { useCurrentUser } from '../../auth/hooks/useAuth';
import RaffleCard from '../components/RaffleCard';
import EmptyState from '../../../core/ui/EmptyState';
import { Skeleton } from '../../../core/ui/Skeleton';
import Emoji from '../../../core/ui/Emoji';

const RafflesPage = () => {
    const user = useCurrentUser();
    const { data: raffles, loading } = useAsync(() => getRaffles(user.id), [user.id]);
    const myTickets = raffles?.reduce((n, r) => n + r.myNumbers.length, 0) ?? 0;

    return (
        <div>
            <div className="mb-5">
                <h1 className="text-[26px] font-bold tracking-tight md:text-3xl">Rifas</h1>
                <p className="mt-0.5 text-[13px] text-muted">
                    Compra boletos con UNICOIN, apoya proyectos estudiantiles y gana premios.
                </p>
            </div>

            {myTickets > 0 && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-raffle-line bg-raffle-soft p-3.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-raffle-soft text-raffle-ink">
                        <Emoji name="ticket" className="h-6 w-6" />
                    </span>
                    <div className="text-[13px]">
                        <p className="font-semibold text-fg">Tienes {myTickets} {myTickets === 1 ? 'boleto activo' : 'boletos activos'}</p>
                        <p className="text-muted">Te avisaremos el día del sorteo. ¡Mucha suerte!</p>
                    </div>
                </div>
            )}

            {loading && !raffles ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {[0, 1, 2].map((i) => (
                        <Skeleton key={i} className="h-[300px] w-full rounded-2xl" />
                    ))}
                </div>
            ) : raffles?.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {raffles.map((raffle) => (
                        <RaffleCard key={raffle.id} raffle={raffle} />
                    ))}
                </div>
            ) : (
                <EmptyState icon={<Emoji name="ticket" />} title="No hay rifas activas" description="Vuelve pronto: cada semana hay nuevas." />
            )}
        </div>
    );
};

export default RafflesPage;
