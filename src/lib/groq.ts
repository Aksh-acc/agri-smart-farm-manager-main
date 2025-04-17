import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: 'your-api-key',
});

export default async function callGroq(prompt: string) {
  const { prompt: userPrompt } = JSON.parse(prompt);

  try {
    const result = await client.chat.completions.create({
      model: 'deepseek-r1-distill-llama-70b',
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const reply = result?.choices?.[0]?.message?.content ?? 'No reply';
    return reply;
  } catch (error) {
    console.error('Groq error:', error);
    throw new Error('Failed to fetch Groq response');
  }
}
