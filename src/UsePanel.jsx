import { useState } from 'react'
import './UsePanel.css'

const TIME_RANGES = [
  { key: '24h', label: '24 hours' },
  { key: '30d', label: '30 days' },
  { key: 'billing', label: 'Billing period' },
]

const DATA_BY_RANGE = {
  '24h': {
    chartTitle: 'Tokens per hour',
    chartSummary: '2.1M total · $168',
    tokens: [
      18, 24, 15, 30, 45, 38, 22, 12, 28, 40, 52, 60, 48, 35, 42, 55, 62, 58, 44, 30, 20, 15, 25,
      33,
    ],
    modelUsage: [
      { model: 'gpt-oss-20b', inputTok: '710K', outputTok: '210K', cost: '$78' },
      { model: 'gpt-oss-120b', inputTok: '470K', outputTok: '135K', cost: '$52' },
      { model: 'qwen3-32b', inputTok: '255K', outputTok: '85K', cost: '$24' },
      { model: 'mistral-small-24b', inputTok: '150K', outputTok: '45K', cost: '$13' },
      { model: 'gemma-3-27b', inputTok: '55K', outputTok: '15K', cost: '$5' },
    ],
    rateLimits: [
      { label: 'Requests / min', value: '1,120 / 6,000', percent: 19, accent: 'green' },
      { label: 'Tokens / min', value: '980K / 1.8M', percent: 54, accent: 'amber' },
      { label: 'Daily call ceiling', value: 'Unlimited · set by AutoX', percent: 22, accent: 'purple' },
      { label: 'Error rate', value: '0.12%', percent: 1, accent: 'red' },
    ],
    warningDetail:
      'Usage is well within limits for the last 24 hours — no action needed right now.',
  },
  '30d': {
    chartTitle: 'Tokens per day',
    chartSummary: '42.6M total · $3,418',
    tokens: [32, 48, 38, 56, 66, 30, 26, 58, 66, 58, 70, 53, 30, 70, 74],
    modelUsage: [
      { model: 'gpt-oss-20b', inputTok: '14.2M', outputTok: '4.2M', cost: '$1,552' },
      { model: 'gpt-oss-120b', inputTok: '9.4M', outputTok: '2.7M', cost: '$1,034' },
      { model: 'qwen3-32b', inputTok: '5.1M', outputTok: '1.7M', cost: '$487' },
      { model: 'mistral-small-24b', inputTok: '3.0M', outputTok: '0.9M', cost: '$251' },
      { model: 'gemma-3-27b', inputTok: '1.1M', outputTok: '0.3M', cost: '$94' },
    ],
    rateLimits: [
      { label: 'Requests / min', value: '1,842 / 6,000', percent: 31, accent: 'green' },
      { label: 'Tokens / min', value: '1.42M / 1.8M', percent: 79, accent: 'amber' },
      { label: 'Daily call ceiling', value: 'Unlimited · set by AutoX', percent: 30, accent: 'purple' },
      { label: 'Error rate', value: '0.31%', percent: 3, accent: 'red' },
    ],
    warningDetail:
      'Add a second CPU replica of gpt-oss-20b, or request a limit increase from your super admin.',
  },
  billing: {
    chartTitle: 'Tokens per week (billing period)',
    chartSummary: '128M total · $9,845',
    tokens: [40, 55, 48, 62, 70, 58, 65, 74, 68, 80, 72, 85],
    modelUsage: [
      { model: 'gpt-oss-20b', inputTok: '42.8M', outputTok: '12.6M', cost: '$4,680' },
      { model: 'gpt-oss-120b', inputTok: '28.1M', outputTok: '8.2M', cost: '$3,120' },
      { model: 'qwen3-32b', inputTok: '15.3M', outputTok: '5.0M', cost: '$1,462' },
      { model: 'mistral-small-24b', inputTok: '9.1M', outputTok: '2.8M', cost: '$754' },
      { model: 'gemma-3-27b', inputTok: '3.4M', outputTok: '0.9M', cost: '$283' },
    ],
    rateLimits: [
      { label: 'Requests / min', value: '2,340 / 6,000', percent: 39, accent: 'green' },
      { label: 'Tokens / min', value: '1.61M / 1.8M', percent: 89, accent: 'amber' },
      { label: 'Daily call ceiling', value: 'Unlimited · set by AutoX', percent: 45, accent: 'purple' },
      { label: 'Error rate', value: '0.42%', percent: 4, accent: 'red' },
    ],
    warningDetail:
      'Nearing the billing-period ceiling — add a second CPU replica of gpt-oss-20b, or request a limit increase from your super admin.',
  },
}

export default function UsePanel() {
  const [timeRange, setTimeRange] = useState('30d')
  const data = DATA_BY_RANGE[timeRange]
  const tokensPerMinLimit = data.rateLimits.find((item) => item.accent === 'amber')

  return (
    <div className="use-panel">
      <div className="use-panel-ranges">
        {TIME_RANGES.map((range) => (
          <button
            key={range.key}
            type="button"
            className={
              timeRange === range.key
                ? 'use-panel-range use-panel-range-active'
                : 'use-panel-range'
            }
            onClick={() => setTimeRange(range.key)}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="use-panel-chart-card">
        <div className="use-panel-chart-header">
          <h2 className="use-panel-chart-title">{data.chartTitle}</h2>
          <div className="use-panel-chart-summary">{data.chartSummary}</div>
        </div>
        <div className="use-panel-chart">
          {data.tokens.map((value, i) => (
            <div
              key={i}
              className={
                i >= data.tokens.length - 2
                  ? 'use-panel-bar use-panel-bar-highlight'
                  : 'use-panel-bar'
              }
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      <div className="use-panel-columns">
        <div className="use-panel-table-wrap">
          <table className="use-panel-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Input tok</th>
                <th>Output tok</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.modelUsage.map((row) => (
                <tr key={row.model}>
                  <td className="use-panel-model-name">{row.model}</td>
                  <td>{row.inputTok}</td>
                  <td>{row.outputTok}</td>
                  <td className="use-panel-cost">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="use-panel-headroom">
          <h2 className="use-panel-headroom-title">Rate limit headroom</h2>
          {data.rateLimits.map((item) => (
            <div key={item.label} className="use-panel-metric">
              <div className="use-panel-metric-row">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="use-panel-metric-track">
                <div
                  className={`use-panel-metric-fill use-panel-metric-fill-${item.accent}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="use-panel-warning">
        <span className="use-panel-warning-icon" aria-hidden="true">
          ⚠
        </span>
        <div>
          <div className="use-panel-warning-title">
            Tokens/min is at {tokensPerMinLimit.percent}% of ceiling
          </div>
          <div className="use-panel-warning-detail">{data.warningDetail}</div>
        </div>
      </div>
    </div>
  )
}
