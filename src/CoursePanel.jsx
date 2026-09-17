import './CoursePanel.css'

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
  return (
    <div className="course-panel">
      <div className="course-panel-header">
        <p className="course-panel-intro">
          Keys inherit the policy of the identity that created them. Scope every key to a project
          and a model allowlist — a key can never exceed the entitlements of its owner.
        </p>
        <button type="button" className="course-panel-create-btn">
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
    </div>
  )
}
