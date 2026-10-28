import { PiMinus, PiPlus } from 'react-icons/pi';

interface QuantityStepperProps {
    value: number;
    min?: number;
    max: number;
    onChange: (value: number) => void;
    size?: 'sm' | 'md';
    label?: string;
}

const QuantityStepper = ({ value, min = 1, max, onChange, size = 'md', label = 'Cantidad' }: QuantityStepperProps) => {
    const btn = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
    return (
        <div className="inline-flex items-center rounded-xl border border-line bg-surface-2" role="group" aria-label={label}>
            <button
                type="button"
                className={`${btn} flex items-center justify-center rounded-l-xl text-muted transition hover:text-fg disabled:text-line`}
                onClick={() => onChange(value - 1)}
                disabled={value <= min}
                aria-label="Disminuir"
            >
                <PiMinus aria-hidden />
            </button>
            <span className={`min-w-[2rem] text-center font-semibold tabular ${size === 'sm' ? 'text-sm' : 'text-[15px]'}`} aria-live="polite">
                {value}
            </span>
            <button
                type="button"
                className={`${btn} flex items-center justify-center rounded-r-xl text-muted transition hover:text-fg disabled:text-line`}
                onClick={() => onChange(value + 1)}
                disabled={value >= max}
                aria-label="Aumentar"
            >
                <PiPlus aria-hidden />
            </button>
        </div>
    );
};

export default QuantityStepper;
