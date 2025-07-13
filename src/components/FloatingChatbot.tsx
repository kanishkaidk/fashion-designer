import React, { useState } from 'react';
import { MessageCircle, X, Send, Wand2 } from 'lucide-react';

interface FloatingChatbotProps {
  darkMode: boolean;
}

interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
  imageUrl?: string;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hey gorgeous! 💅 I'm your AI fashion stylist. Describe your vibe and I can create a custom look for you! Try saying something like 'I want a cozy fall outfit' or 'create a glamorous evening look'",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fashionResponses = [
    "That sounds absolutely divine! ✨ Let me create something magical for you...",
    "Ooh, I'm getting major main character energy! 💫 Creating your perfect look now...",
    "Love that aesthetic! 🌸 Designing something special just for you...",
    "YES! That's such a mood! 💖 Let me work my fashion magic...",
    "Girl, you have such great taste! ✨ Bringing your vision to life...",
    "That's giving me serious fashion week vibes! 🎀 Creating something runway-worthy...",
    "Obsessed with this direction! 💅 Designing your dream outfit now..."
  ];

  const generateFashionImage = async (userPrompt: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          style: 'Casual',
          fabric: 'Cotton',
          colorTheme: 'Pastel',
          mainColor: '#ec4899',
          modelSize: 'M',
          length: 'Midi',
          mood: 'Romantic',
          season: 'Spring',
          accessory: 'Jewelry'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.suggestions && data.suggestions.length > 0) {
          return data.suggestions[0].imageUrl;
        }
      }
    } catch (error) {
      console.error('Error generating fashion image:', error);
    }
    return null;
  };

  const handleSendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage: ChatMessage = {
    text: inputText,
    isBot: false,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  const currentInput = inputText;
  setInputText('');
  setIsTyping(true);

  setTimeout(async () => {
    let imageUrl = null;

    // Check if it's fashion-related
    const isFashionRequest = /create|design|make|outfit|look|dress|style|fashion|wear/i.test(currentInput);
    if (isFashionRequest) {
      imageUrl = await generateFashionImage(currentInput);
    }

    let botText = "Give me a sec, working on it! ✨";

    // Get GPT-style response
    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();
      botText = data.reply || "Hmm, something went off — try again?";
    } catch (err) {
      botText = "Oops! I'm having a fashion crisis 💔 Try again later.";
      console.error(err);
    }

    const botMessage: ChatMessage = {
      text: botText,
      isBot: true,
      timestamp: new Date(),
      imageUrl: imageUrl || undefined
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  }, 1500);
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="chatbot-bubble"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full sm:w-[400px] h-screen z-50">
          <div className={`${
            darkMode ? 'glassmorphism-dark' : 'glassmorphism'
          } rounded-3xl h-full flex flex-col overflow-hidden shadow-2xl border-2 ${
            darkMode ? 'border-pink-500/20' : 'border-pink-200/50'
          }`}>
            {/* Header */}
<div className={`p-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} flex items-center justify-between`}>
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
      <Wand2 className="w-4 h-4 text-white" />
    </div>
    <div>
      <h3 className={`font-quirky font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>FashionBot AI</h3>
      <p className={`font-quirky text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Your AI stylist</p>
    </div>
  </div>

  {/* Close Button */}
  <button
    onClick={() => setIsOpen(false)}
    className="hover:scale-110 transition-transform"
    aria-label="Close chatbot"
  >
    <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
  </button>
</div>


            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isBot
                        ? darkMode
                          ? 'bg-purple-600 text-white'
                          : 'bg-pink-100 text-gray-800'
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    }`}
                  >
                    <p className="font-quirky text-sm">{message.text}</p>
                    {message.imageUrl && (
                      <img 
                        src={message.imageUrl} 
                        alt="Generated fashion design" 
                        className="mt-2 rounded-lg w-full h-32 object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`px-4 py-2 rounded-2xl ${
                    darkMode ? 'bg-purple-600' : 'bg-pink-100'
                  }`}>
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your vibe..."
                  className="font-quirky flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};