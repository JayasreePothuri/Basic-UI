export const dashboardData = {
  metrics: [
    { label: 'Requests today', value: '184,302', detail: '1,842 rpm peak · 0.31% errors', tone: 'violet' },
    { label: 'Time to first token', value: '310', unit: 'ms p50', detail: 'p95 940 ms · queue depth 3', tone: 'blue' },
    { label: 'Throughput', value: '46', unit: 'tok/s', detail: 'gpt-oss-20b Q4_K_M · 32 vCPU', tone: 'green' },
    { label: 'Spend, month to date', value: '$3,418', detail: '42.6M tokens · $0.08 / 1M avg', tone: 'orange', accent: true },
  ],
  modelTraffic: [
    { name: 'gpt-oss-20b', tokens: '18.4M', percentage: 92, tone: 'violet' },
    { name: 'gpt-oss-120b', tokens: '12.1M', percentage: 63, tone: 'blue' },
    { name: 'qwen3-32b', tokens: '6.8M', percentage: 37, tone: 'green' },
    { name: 'mistral-small-24b', tokens: '3.9M', percentage: 24, tone: 'orange' },
    { name: 'gemma-3-27b', tokens: '1.4M', percentage: 9, tone: 'teal' },
  ],
  nodes: [
    { label: 'vCPU utilisation', value: '68%', percentage: 68, tone: 'orange' },
    { label: 'RAM (KV cache)', value: '54%', percentage: 54, tone: 'violet' },
    { label: 'Concurrent sessions', value: '112 / 160', percentage: 70, tone: 'blue' },
  ],
  quickStart: `from openai import OpenAI

client = OpenAI(
  base_url="https://api.autox.ai/v1",
  api_key=os.environ["AUTOX_API_KEY"],
)
r = client.chat.completions.create(
  model="gpt-oss-120b",
  messages=[{"role":"user","content":"Hi"}],
)`,
}