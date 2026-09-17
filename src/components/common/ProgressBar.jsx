export function ProgressBar({ value, tone = 'violet' }) {
  return (
    <div className="progress-track" aria-hidden="true">
      <span className={`progress-fill progress-${tone}`} style={{ width: `${value}%` }} />
    </div>
  )
}