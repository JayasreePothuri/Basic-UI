import { ProgressBar } from '../common/ProgressBar'

export function ModelTraffic({ models }) {
  return (
    <section className="panel traffic-panel">
      <div className="panel-heading">
        <h2>Tokens served by model</h2>
        <span>LAST 7 DAYS</span>
      </div>
      <div className="model-list">
        {models.map((model) => (
          <div className="model-row" key={model.name}>
            <span className="model-name">{model.name}</span>
            <ProgressBar value={model.percentage} tone={model.tone} />
            <span className="model-tokens">{model.tokens}</span>
          </div>
        ))}
      </div>
      <p className="traffic-note">Quantized GPT-OSS carries 72% of your traffic at 31% of the cost of the equivalent hosted frontier model.</p>
    </section>
  )
}