interface ProgressMeterProps {
  value: number;
  label: string;
  tone?: 'blue' | 'green' | 'gold';
}

export function ProgressMeter({ value, label, tone = 'blue' }: ProgressMeterProps) {
  const safeValue = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));
  return (
    <div className={'progress-meter progress-' + tone}>
      <div className="progress-meter-track" role="progressbar" aria-label={label}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <span style={{ width: safeValue + '%' }} />
      </div>
    </div>
  );
}
