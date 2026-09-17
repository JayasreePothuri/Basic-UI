import './Models.css'

const filters = ['All models', 'GPT-OSS', 'Llama', 'Qwen', 'Mistral', 'Gemma']

const models = [
  {
    id: 'gpt-oss-20b',
    description: 'Reasoning · tool calling · 20B MoE',
    quant: 'Q4_K_M',
    disk: '11.6 GB',
    context: '131,072',
    speed: '46',
    price: '$0.05 · $0.20',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'gpt-oss-120b',
    description: 'Reasoning · tool calling · 120B MoE',
    quant: 'Q4_K_M',
    disk: '63.4 GB',
    context: '131,072',
    speed: '14',
    price: '$0.15 · $0.60',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'llama-3.3-70b',
    description: 'General instruct · long context',
    quant: 'Q4_K_M',
    disk: '40.2 GB',
    context: '128,000',
    speed: '9',
    price: '$0.18 · $0.72',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'llama-3.1-70b',
    description: 'General instruct · widely benchmarked',
    quant: 'Q5_K_M',
    disk: '49.9 GB',
    context: '128,000',
    speed: '7',
    price: '$0.18 · $0.72',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'qwen3-32b',
    description: 'Reasoning models · strong multilingual',
    quant: 'Q4_K_M',
    disk: '19.8 GB',
    context: '32,768',
    speed: '18',
    price: '$0.09 · $0.36',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'mistral-small-24b',
    description: 'Low latency · function calling',
    quant: 'Q4_K_M',
    disk: '14.3 GB',
    context: '32,768',
    speed: '24',
    price: '$0.07 · $0.28',
    status: 'Live',
    statusTone: 'live',
  },
  {
    id: 'gemma-3-27b',
    description: 'Vision-capable · summarisation',
    quant: 'Q4_0',
    disk: '16.1 GB',
    context: '128,000',
    speed: '21',
    price: '$0.08 · $0.32',
    status: 'Preview',
    statusTone: 'preview',
  },
]

function App() {
  return (
    <main className="page-shell">
      <div className="model-page">
        <div className="filter-bar" aria-label="Model filters">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${index === 0 ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Model ID</th>
                <th>Quantization</th>
                <th>On Disk</th>
                <th>Context</th>
                <th>Tok/S (CPU)</th>
                <th>Price / 1M in-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id}>
                  <td className="model-cell">
                    <div className="model-name">{model.id}</div>
                    <div className="model-description">{model.description}</div>
                  </td>
                  <td>{model.quant}</td>
                  <td>{model.disk}</td>
                  <td>{model.context}</td>
                  <td className="speed-cell">{model.speed}</td>
                  <td>{model.price}</td>
                  <td>
                    <span className={`status-pill ${model.statusTone}`}>
                      <span className="status-dot" aria-hidden="true" />
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default App
