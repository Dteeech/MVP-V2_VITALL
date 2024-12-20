import { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_DATA = {
  "documents": "Les documents requis sont : carte d'identité, justificatif de domicile, certificat médical de moins de 3 mois.",
  "étapes": "Les étapes sont : 1. Inscription en ligne, 2. Validation du dossier, 3. Tests physiques, 4. Entretien.",
  "casernes": "Les casernes sont réparties dans toute la ville. Vous pouvez voir leur emplacement sur la carte interactive.",
  "formation": "La formation initiale dure environ 4 mois et comprend des modules théoriques et pratiques."
};

export function ChatbotDialog({ isOpen, onClose }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis là pour répondre à vos questions sur le processus de recrutement. Que souhaitez-vous savoir ?",
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simple keyword-based response system
    const response = Object.entries(FAQ_DATA).find(([key]) =>
      input.toLowerCase().includes(key)
    )?.[1] || "Désolé, je ne peux pas répondre à cette question. Essayez de demander des informations sur les documents requis, les étapes du recrutement, les casernes ou la formation.";

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        isBot: true
      }]);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50">
      <div className="bg-[#347879] p-4 text-white">
        <h3 className="font-medium">Assistant virtuel</h3>
        <p className="text-sm opacity-75">Je réponds à vos questions</p>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-[#347879] text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question..."
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#347879] focus:border-[#347879]"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-[#347879] text-white rounded-lg hover:bg-[#ED6D47] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}