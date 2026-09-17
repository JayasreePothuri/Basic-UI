export function MetricCard({ label, value, unit, detail, tone, accent }) {
  return (
    <article className={`metric-card metric-${tone}`}>
      <p className="eyebrow">{label}</p>
      <div className={`metric-value${accent ? ' metric-value-accent' : ''}`}>
        {value}
        {unit && <span>{unit}</span>}
      </div>
      <p className="metric-detail">{detail}</p>
    </article>
  )
}