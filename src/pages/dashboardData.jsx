import { useState } from 'react'
import { CpuNodePool } from '../components/dashboard/CpuNodePool'
import { MetricCard } from '../components/dashboard/MetricCard'
import { ModelTraffic } from '../components/dashboard/ModelTraffic'
import { QuickStart } from '../components/dashboard/QuickStart'
import { dashboardData } from '../data/dashboardData'
import '../styles/dashboarddata.css'

export function Dashboard() {
  const [notice, setNotice] = useState('')
  const data = dashboardData

  function handleOpenPlayground() {
    setNotice('Playground connection ready')
    window.setTimeout(() => setNotice(''), 2600)
  }

  return (
    <main className="dashboard-shell">
      {/* <header className="topbar">
        <div className="brand-lockup"><span className="brand-mark">A</span><span>autox<span className="brand-dot">.</span>ai</span></div>
        <div className="topbar-meta"><span className="status-dot" />All systems operational <span className="divider" /> Updated just now</div>
      </header>
      <div className="page-intro">
        <div><p className="eyebrow">RUNTIME OVERVIEW</p><h1>Good afternoon, Alex</h1></div>
        <button className="date-button" type="button">Last 7 days <span aria-hidden="true">⌄</span></button>
      </div> */}
      <div className="metrics-grid">{data.metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}</div>
      <div className="content-grid">
        <ModelTraffic models={data.modelTraffic} />
        <div className="side-stack"><CpuNodePool nodes={data.nodes} /><QuickStart code={data.quickStart} onOpenPlayground={handleOpenPlayground} /></div>
      </div>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  )
}