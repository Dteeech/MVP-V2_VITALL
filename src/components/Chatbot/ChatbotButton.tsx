import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatbotDialog } from './ChatbotDialog';

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-200 ease-in-out ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-[#347879] hover:bg-[#ED6D47]'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
      <ChatbotDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}