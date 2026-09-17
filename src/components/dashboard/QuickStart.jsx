export function QuickStart({ code, onOpenPlayground }) {
  return (
    <section className="panel quickstart-panel">
      <div className="panel-heading"><h2>Quickstart</h2></div>
      <pre className="code-block"><code>{code}</code></pre>
      <button className="playground-button" type="button" onClick={onOpenPlayground}>Open the playground <span aria-hidden="true">↗</span></button>
    </section>
  )
}