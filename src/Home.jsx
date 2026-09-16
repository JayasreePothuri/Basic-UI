import './Home.css'

function Home() {
  return (
    <main className="home-page">
      <h1 className="home-firstline">LLMs as a service, inside your boundary</h1>

      <h1 className="home-secondline">
        Open models. Quantized for CPU. Served on your own compute.
      </h1>

      <h1 className="home-thirdline">
        One OpenAI-compatible endpoint for GPT-OSS, Llama, Qwen, Mistral and
        Gemma — running on commodity CPU nodes. No GPU fleet. No proprietary
        model holding your enterprise hostage.
      </h1>

      <div className="home-button">
        <button className="home-buttons">7 open models</button>
        <button className="home-buttons">Int4 / Int8 quantization</button>
        <button className="home-buttons">Air-gap capable</button>
      </div>
    </main>
  )
}

export default Home
