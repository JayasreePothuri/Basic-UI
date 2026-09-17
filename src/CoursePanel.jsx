import { useState } from 'react'
import './CoursePanel.css'

const MODEL_OPTIONS = [
  'gpt-oss-20b',
  'gpt-oss-120b',
  'qwen3-32b',
  'llama-3.3-70b',
  'mistral-small-24b',
]

const API_KEYS = [
  {
    name: 'claims-copilot-prod',
    owner: 'a.kapoor@acme-fin.com',
    key: 'sk-autox-7Fq…4Bd2',
    models: 'gpt-oss-20b · gpt-oss-120b',
    rateLimit: '1,200 rpm',
    lastUsed: '2 min ago',
    status: 'Active',
  },
  {
    name: 'underwriting-batch',
    owner: 'svc-underwriting',
    key: 'sk-autox-2Mx…9Lk7',
    models: 'llama-3.3-70b',
    rateLimit: '600 rpm',
    lastUsed: '18 min ago',
    status: 'Active',
  },
  {
    name: 'ci-runner-legacy',
    owner: 'r.mehta@acme-fin.com',
    key: 'sk-autox-9Za…1Qp0',
    models: 'All published',
    rateLimit: 'Org default',
    lastUsed: '31 days ago',
    status: 'Revoked',
  },
]

const SUMMARY_CARDS = [
  {
    label: 'Org rate limit',
    value: '6,000 req / min',
    detail: '1.8M tokens / min across all keys',
    accent: 'purple',
  },
  {
    label: 'Key rotation policy',
    value: '90 days',
    detail: 'Enforced by super admin · 2 keys due in 14 days',
    accent: 'blue',
  },
  {
    label: 'Egress',
    value: 'Private VPC only',
    detail: 'No prompt or completion leaves the boundary',
    accent: 'orange',
  },
]

export default function CoursePanel() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedModels, setSelectedModels] = useState(['gpt-oss-20b', 'gpt-oss-120b'])

  function toggleModel(model) {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    )
  }

  return (
    <div className="course-panel">
      <div className="course-panel-header">
        <p className="course-panel-intro">
          Keys inherit the policy of the identity that created them. Scope every key to a project
          and a model allowlist — a key can never exceed the entitlements of its owner.
        </p>
        <button
          type="button"
          className="course-panel-create-btn"
          onClick={() => setIsCreateOpen(true)}
        >
          Create API key
        </button>
      </div>

      <div className="course-panel-table-wrap">
        <table className="course-panel-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Model allowlist</th>
              <th>Rate limit</th>
              <th>Last used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {API_KEYS.map((row) => (
              <tr key={row.name}>
                <td>
                  <div className="course-panel-name">{row.name}</div>
                  <div className="course-panel-owner">{row.owner}</div>
                </td>
                <td className="course-panel-key">{row.key}</td>
                <td>{row.models}</td>
                <td>{row.rateLimit}</td>
                <td>{row.lastUsed}</td>
                <td>
                  <span
                    className={
                      row.status === 'Active'
                        ? 'course-panel-status course-panel-status-active'
                        : 'course-panel-status course-panel-status-revoked'
                    }
                  >
                    ● {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="course-panel-summary">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.label} className={`course-panel-card course-panel-card-${card.accent}`}>
            <div className="course-panel-card-label">{card.label}</div>
            <div className="course-panel-card-value">{card.value}</div>
            <div className="course-panel-card-detail">{card.detail}</div>
          </div>
        ))}
      </div>

      {isCreateOpen && (
        <div className="course-modal-overlay" onClick={() => setIsCreateOpen(false)}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <div className="course-modal-topbar" />

            <h2 className="course-modal-heading">Create API key</h2>
            <p className="course-modal-subtext">
              The key is shown once. It inherits your entitlements and cannot exceed them.
            </p>

            <label htmlFor="course-key-name" className="course-modal-label">
              Key name
            </label>
            <input
              id="course-key-name"
              type="text"
              className="course-modal-input"
              placeholder="claims-copilot-prod"
            />

            <div className="course-modal-label">Model allowlist</div>
            <div className="course-modal-models">
              {MODEL_OPTIONS.map((model) => (
                <button
                  key={model}
                  type="button"
                  className={
                    selectedModels.includes(model)
                      ? 'course-modal-model course-modal-model-active'
                      : 'course-modal-model'
                  }
                  onClick={() => toggleModel(model)}
                >
                  {model}
                </button>
              ))}
            </div>

            <div className="course-modal-row">
              <div className="course-modal-field">
                <label htmlFor="course-rate-limit" className="course-modal-label">
                  Rate limit
                </label>
                <select id="course-rate-limit" className="course-modal-select" defaultValue="600">
                  <option value="600">600 req / min</option>
                  <option value="1200">1,200 req / min</option>
                  <option value="6000">6,000 req / min</option>
                </select>
              </div>

              <div className="course-modal-field">
                <label htmlFor="course-expires" className="course-modal-label">
                  Expires
                </label>
                <select id="course-expires" className="course-modal-select" defaultValue="90">
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
            </div>

            <div className="course-modal-actions">
              <button
                type="button"
                className="course-modal-cancel"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="course-modal-generate"
                onClick={() => setIsCreateOpen(false)}
              >
                Generate key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
