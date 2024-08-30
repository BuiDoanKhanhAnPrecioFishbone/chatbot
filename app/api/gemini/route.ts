
export async function POST(request: Request) {
  const { prompt } = await request.json();
    const input={
        contents:[{parts:[{text:prompt}]}]
    }
  const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBznZvzEJFjS4Tp6zcA6bZcK968Y78A3YU', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await geminiResponse.json();

  return new Response(JSON.stringify(data));
}