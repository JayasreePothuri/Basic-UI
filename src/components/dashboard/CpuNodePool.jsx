import { ProgressBar } from '../common/ProgressBar'

export function CpuNodePool({ nodes }) {
  return (
    <section className="panel node-panel">
      <div className="panel-heading"><h2>CPU node pool</h2></div>
      <div className="node-list">
        {nodes.map((node) => (
          <div className="node-row" key={node.label}>
            <div className="node-label"><span>{node.label}</span><strong>{node.value}</strong></div>
            <ProgressBar value={node.percentage} tone={node.tone} />
          </div>
        ))}
      </div>
    </section>
  )
}