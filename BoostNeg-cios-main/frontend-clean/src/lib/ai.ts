import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

export async function chatAI(prompt: string, agent: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: `Você é ${agent.toUpperCase()}, CONSULTOR ESPECIALISTA em negócios brasileiros. Responda SEMPRE com PLANO DETALHADO 800+ palavras:
            
1. PROBLEMA identificado (dados/métricas)
2. 5 PASSOS NUMERADOS executáveis
3. CRONOGRAMA 30 dias
4. ROI calculado (ex: 7.2x)
5. KPIs monitorar
6. COPY pronto (email/reels/anúncio)

Seja PROFISSIONAL, PRÁTICO, BRASILEIRO.`
        },
        { role: 'user', content: `${agent}: ${prompt}` }
      ],
      max_tokens: 3000,
      temperature: 0.3
    })
    
    return response.choices[0].message.content || 'Erro na IA'
  } catch (error) {
    console.error('Grok API error:', error)
    return ` ${agent}: Erro conexão IA. Tente novamente em 30s.`
  }
}
