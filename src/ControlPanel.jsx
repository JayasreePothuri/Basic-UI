import { useState } from 'react'
import './ControlPanel.css'

const MODEL_OPTIONS = [
  { value: 'qwen3-32b', badges: ['Q4_K_M', '131k ctx', 'CPU pool A'] },
  { value: 'gpt-oss-20b', badges: ['Q8_0', '32k ctx', 'CPU pool A'] },
  { value: 'gpt-oss-120b', badges: ['Q4_K_M', '32k ctx', 'GPU pool B'] },
  { value: 'mistral-small-24b', badges: ['Q4_K_M', '64k ctx', 'CPU pool A'] },
  { value: 'gemma-3-27b', badges: ['Q4_K_M', '32k ctx', 'CPU pool A'] },
]

const REASONING_LEVELS = ['Low', 'Medium', 'High']
const CODE_TABS = ['cURL', 'Python', 'Node']

const DEFAULT_SYSTEM_PROMPT =
  'You are AutoX Assist. Answer from the retrieved policy documents only. Cite the clause number.'

const DEFAULT_QUERY = 'Summarise clause 14 of the vendor master agreement and flag any termination risk.'

const ASSISTANT_RESPONSE = [
  'Clause 14 (Termination for Convenience) lets either party exit on 30 days written notice with no penalty, which is unusually short for a three-year master agreement.',
  "Risk: the vendor can terminate mid-migration while your agents still depend on their data feed. Clause 14.3 also makes transition assistance discretionary rather than mandatory.",
  'Recommended position: extend notice to 90 days, and make 12 weeks of transition assistance an obligation under 14.3.',
]

const STATS = { ttft: '0.28', throughput: 46, tokens: 214, cost: '0.00013' }

function escapeForCode(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n')
}

function buildSnippets(params) {
  const {
    model,
    temperature,
    topP,
    topK,
    maxTokens,
    frequencyPenalty,
    presencePenalty,
    reasoningEffort,
    stopSequence,
    streaming,
    systemPrompt,
    query,
  } = params

  const reasoning = reasoningEffort.toLowerCase()
  const stopValuePy = stopSequence ? `"${stopSequence}"` : 'null'
  const stopValueJson = stopSequence ? `"${stopSequence}"` : 'null'
  const systemContent = escapeForCode(systemPrompt)
  const userContent = escapeForCode(query)

  const python = `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.autox.ai/v1",
    api_key=os.environ.get("AUTOX_API_KEY", "sk-autox-xxxxxxxxxxxxxxxx"),
)

messages = [
    {"role": "system", "content": "${systemContent}"},
    {"role": "user", "content": "${userContent}"},
]

resp = client.chat.completions.create(
    model="${model}",
    messages=messages,
    temperature=${temperature},
    top_p=${topP},
    max_tokens=${maxTokens},
    frequency_penalty=${frequencyPenalty},
    presence_penalty=${presencePenalty},
    extra_body={"top_k": ${topK}, "reasoning_effort": "${reasoning}"},
    stop=${stopValuePy},
    stream=${streaming ? 'True' : 'False'},
)

print(resp.choices[0].message.content)`

  const curl = `curl https://api.autox.ai/v1/chat/completions \\
  -H "Authorization: Bearer sk-autox-xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [
      {"role": "system", "content": "${systemContent}"},
      {"role": "user", "content": "${userContent}"}
    ],
    "temperature": ${temperature},
    "top_p": ${topP},
    "max_tokens": ${maxTokens},
    "frequency_penalty": ${frequencyPenalty},
    "presence_penalty": ${presencePenalty},
    "top_k": ${topK},
    "reasoning_effort": "${reasoning}",
    "stop": ${stopValueJson},
    "stream": ${streaming}
  }'`

  const node = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.autox.ai/v1",
  apiKey: process.env.AUTOX_API_KEY || "sk-autox-xxxxxxxxxxxxxxxx",
});

const messages = [
  { role: "system", content: "${systemContent}" },
  { role: "user", content: "${userContent}" },
];

const resp = await client.chat.completions.create({
  model: "${model}",
  messages,
  temperature: ${temperature},
  top_p: ${topP},
  max_tokens: ${maxTokens},
  frequency_penalty: ${frequencyPenalty},
  presence_penalty: ${presencePenalty},
  top_k: ${topK},
  reasoning_effort: "${reasoning}",
  stop: ${stopValueJson},
  stream: ${streaming},
});

console.log(resp.choices[0].message.content);`

  return { cURL: curl, Python: python, Node: node }
}

export default function ControlPanel() {
  const [model, setModel] = useState('qwen3-32b')
  const [temperature, setTemperature] = useState(0.7)
  const [topP, setTopP] = useState(1)
  const [topK, setTopK] = useState(40)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [frequencyPenalty, setFrequencyPenalty] = useState(0)
  const [presencePenalty, setPresencePenalty] = useState(0)
  const [reasoningEffort, setReasoningEffort] = useState('Low')
  const [seed, setSeed] = useState('')
  const [stopSequence, setStopSequence] = useState('')
  const [streaming, setStreaming] = useState(true)
  const [jsonMode, setJsonMode] = useState(false)
  const [toolCalling, setToolCalling] = useState(false)

  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [response, setResponse] = useState(ASSISTANT_RESPONSE)
  const [isRunning, setIsRunning] = useState(false)

  const [activeCodeTab, setActiveCodeTab] = useState('Python')
  const [copyLabel, setCopyLabel] = useState('Copy code')

  const activeModel = MODEL_OPTIONS.find((m) => m.value === model) ?? MODEL_OPTIONS[0]

  const snippets = buildSnippets({
    model,
    temperature,
    topP,
    topK,
    maxTokens,
    frequencyPenalty,
    presencePenalty,
    reasoningEffort,
    stopSequence,
    streaming,
    systemPrompt,
    query,
  })

  function handleRunRequest() {
    setIsRunning(true)
    setResponse(null)
    window.setTimeout(() => {
      setResponse(ASSISTANT_RESPONSE)
      setIsRunning(false)
    }, 650)
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(snippets[activeCodeTab])
      setCopyLabel('Copied!')
    } catch {
      setCopyLabel('Copy failed')
    }
    window.setTimeout(() => setCopyLabel('Copy code'), 1500)
  }

  return (
    <div className="control-panel">
      <div className="control-panel-card">
        <div className="control-panel-label control-panel-label-accent">Model</div>

        <div className="control-panel-select-wrap">
          <select
            className="control-panel-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <span className="control-panel-select-chevron" aria-hidden="true">
            ⌄
          </span>
        </div>

        <div className="control-panel-badges">
          {activeModel.badges.map((badge) => (
            <span key={badge} className="control-panel-badge">
              {badge}
            </span>
          ))}
        </div>

        <hr className="control-panel-divider" />

        <SliderField
          label="Temperature"
          value={temperature}
          onChange={setTemperature}
          min={0}
          max={2}
          step={0.1}
        />
        <SliderField label="Top P" value={topP} onChange={setTopP} min={0} max={1} step={0.05} />
        <SliderField label="Top K" value={topK} onChange={setTopK} min={0} max={100} step={1} />
        <SliderField
          label="Max tokens"
          value={maxTokens}
          onChange={setMaxTokens}
          min={1}
          max={4096}
          step={1}
        />
        <SliderField
          label="Frequency penalty"
          value={frequencyPenalty}
          onChange={setFrequencyPenalty}
          min={-2}
          max={2}
          step={0.1}
        />
        <SliderField
          label="Presence penalty"
          value={presencePenalty}
          onChange={setPresencePenalty}
          min={-2}
          max={2}
          step={0.1}
        />

        <div className="control-panel-label">Reasoning effort</div>
        <div className="control-panel-segmented">
          {REASONING_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              className={
                reasoningEffort === level
                  ? 'control-panel-segment control-panel-segment-active'
                  : 'control-panel-segment'
              }
              onClick={() => setReasoningEffort(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="control-panel-row">
          <div className="control-panel-field">
            <div className="control-panel-label">Seed</div>
            <input
              type="text"
              className="control-panel-input"
              placeholder="random"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </div>
          <div className="control-panel-field">
            <div className="control-panel-label">Stop sequence</div>
            <input
              type="text"
              className="control-panel-input"
              placeholder="</end>"
              value={stopSequence}
              onChange={(e) => setStopSequence(e.target.value)}
            />
          </div>
        </div>

        <ToggleField label="Streaming" value={streaming} onChange={setStreaming} />
        <ToggleField label="JSON mode" value={jsonMode} onChange={setJsonMode} />
        <ToggleField label="Tool calling" value={toolCalling} onChange={setToolCalling} />
      </div>

      <div className="control-panel-middle">
        <div className="control-panel-card">
          <div className="control-panel-label">System prompt</div>
          <textarea
            className="control-panel-textarea"
            rows={3}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
        </div>

        <div className="control-panel-card control-panel-conversation-card">
          <div className="control-panel-label">Conversation</div>

          <div className="control-panel-conversation">
            <div className="control-panel-message">
              <div className="control-panel-avatar control-panel-avatar-user">AK</div>
              <textarea
                className="control-panel-bubble control-panel-bubble-user"
                rows={2}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="control-panel-message">
              <div className="control-panel-avatar control-panel-avatar-assistant" aria-hidden="true">
                🤖
              </div>
              <div className="control-panel-bubble control-panel-bubble-assistant">
                {isRunning || !response ? (
                  <span className="control-panel-thinking">Thinking…</span>
                ) : (
                  response.map((paragraph, i) => <p key={i}>{paragraph}</p>)
                )}
              </div>
            </div>
          </div>

          <div className="control-panel-footer">
            <div className="control-panel-stats">
              <div>
                <span className="control-panel-stat-label">TTFT</span>{' '}
                <span className="control-panel-stat-value">{STATS.ttft} s</span>
              </div>
              <div>
                <span className="control-panel-stat-label">Throughput</span>{' '}
                <span className="control-panel-stat-value">{STATS.throughput} tok/s</span>
              </div>
              <div>
                <span className="control-panel-stat-label">Tokens</span>{' '}
                <span className="control-panel-stat-value">{STATS.tokens}</span>
              </div>
              <div>
                <span className="control-panel-stat-label">Cost</span>{' '}
                <span className="control-panel-stat-value">${STATS.cost}</span>
              </div>
            </div>
            <button
              type="button"
              className="control-panel-run-btn"
              onClick={handleRunRequest}
              disabled={isRunning}
            >
              {isRunning ? 'Running…' : 'Run request'}
            </button>
          </div>
        </div>
      </div>

      <div className="control-panel-card control-panel-code-card">
        <div className="control-panel-code-tabs">
          {CODE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeCodeTab === tab
                  ? 'control-panel-code-tab control-panel-code-tab-active'
                  : 'control-panel-code-tab'
              }
              onClick={() => setActiveCodeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <pre className="control-panel-code-block">
          <code>{snippets[activeCodeTab]}</code>
        </pre>

        <button type="button" className="control-panel-copy-btn" onClick={handleCopyCode}>
          {copyLabel}
        </button>

        <div className="control-panel-endpoint-note">
          The endpoint is OpenAI-compatible. Point an existing SDK at{' '}
          <code>api.autox.ai/v1</code> and change the model name.
        </div>
      </div>
    </div>
  )
}

function SliderField({ label, value, onChange, min, max, step }) {
  return (
    <div className="control-panel-slider-field">
      <div className="control-panel-slider-row">
        <span className="control-panel-label">{label}</span>
        <span className="control-panel-slider-value">{value}</span>
      </div>
      <input
        type="range"
        className="control-panel-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

function ToggleField({ label, value, onChange }) {
  return (
    <div className="control-panel-toggle-row">
      <span className="control-panel-toggle-label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={
          value
            ? 'control-panel-toggle-badge control-panel-toggle-badge-on'
            : 'control-panel-toggle-badge'
        }
        onClick={() => onChange(!value)}
      >
        {value ? 'On' : 'Off'}
      </button>
    </div>
  )
}
