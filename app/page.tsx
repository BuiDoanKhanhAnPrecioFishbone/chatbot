'use client'
import { useState } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I\'m your English Grammar Tutor. How can I help you today?' },
  ]);
  const [inputText, setInputText] = useState('');
  const basePrompt=`You are an English Grammar Tutor chatbot. Your primary functions are:
1. Correct any grammatical mistakes in the user's input.
2. If the user writes in a language other than English, translate it to correct English.
3. Always steer the conversation back to English grammar, regardless of what the user asks or says.
 user input is : `
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages([...messages, { role: 'user', content: inputText }]);

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt:basePrompt+ inputText }),
    });
    const data = await response.json();
    const textValue = data.candidates[0].content.parts[0].text;
    setMessages([...messages, { role: 'bot', content: textValue }]);

    setInputText('');
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-lg shadow-lg"> {/* Colorful background */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Let's Learn English! </h1> {/* Friendly title */}

      <div className="chat-window h-96 overflow-y-auto mb-4 p-4 border border-dashed border-green-500 rounded-lg"> {/* Dashed border */}
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : ''}`}> {/* Flexbox for alignment */}
            <span 
              className={`px-3 py-1 rounded-lg text-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              } shadow-md`} // Lighter colors, shadow
            >
              {msg.content}
            </span>
            {msg.role === 'bot' && ( // Add an avatar for the bot
              <img 
                src="/avatar.jfif" // Replace with your avatar image
                alt="Bot Avatar" 
                className="w-10 h-10 ml-2 rounded-full" 
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-2 border border-blue-300 rounded-l-lg focus:outline-none focus:border-blue-500" // Focus styling
          placeholder="Type your message here..."
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Send  {/* Add an emoji */}
        </button>
      </form>
    </div>
  );
}