import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

export async function chatAI(prompt: string, agent: string) {
  const response = await openai.chat.completions.create({
    model: 'grok-beta',
    messages: [
      {
        role: 'system',
        content: `Você é ${agent.toUpperCase()}, CONSULTOR ESPECIALISTA em negócios. Responda SEMPRE com PLANO DETALHADO 500+ palavras, 5 PASSOS NUMERADOS, métricas específicas, ROI calculado, cronograma 30 dias. Seja PROFISSIONAL e PRÁTICO.`
      },
      { role: 'user', content: `${agent}: ${prompt}` }
    ],
    max_tokens: 3000,
    temperature: 0.3
  })
  
  return response.choices[0].message.content || 'Erro na IA'
}
