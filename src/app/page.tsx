'use client';

import { useState } from 'react';
import { ClientMessage } from './actions';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="w-full">
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {conversation.map((m: ClientMessage) => (
          <div key={m.id} className="pb-8">
            <div className="font-mono">{m.role === 'user' ? 'User: ' : 'AI: '}</div>
            <div className="font-sans whitespace-pre-wrap">{m.display}</div>
          </div>
        ))}
      </div>

      <form
        className="flex items-center justify-center fixed bottom-0 w-full p-8"
        onSubmit={async (e) => {
        e.preventDefault();
        setInput('');
        
        setConversation((currentConversation: ClientMessage[]) => [
          ...currentConversation,
          {id: nanoid(), role: 'user', display: input},
        ]);

        const message = await continueConversation(input);

        setConversation((currentConversation: ClientMessage[]) => [
          ...currentConversation,
          message,
        ]);
      }}>
        <input
          className="w-full p-2 border rounded border-gray-700 bg-gray-900 text-gray-200 max-w-lg"
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
      </form>
  </div>
)};