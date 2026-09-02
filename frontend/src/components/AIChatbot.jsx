import { useState, useEffect, useRef } from 'react';
import { Send, Bot, MessageSquare, X, RefreshCw } from 'lucide-react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I am your AI farming assistant. How can I help you today? You can ask me about crop diseases, fertilizer recommendations, weather, market prices, irrigation, or any farming-related questions.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Pre-defined responses for demo
  const botResponses = {
    greeting: [
      "Hello! I'm here to help with all your farming needs. What would you like to know?",
      "Hi there! How can I assist you with your farm today?",
      "Welcome! Ask me anything about crops, diseases, fertilizers, weather, or market prices."
    ],
    disease: [
      "For disease detection, please use the Disease Detection page to upload a leaf photo. Our AI will analyze it and provide diagnosis with treatment recommendations.",
      "Common crop diseases include leaf rust, powdery mildew, blight, and bacterial wilt. Upload a clear photo for accurate identification.",
      "Early detection is key! Check leaves regularly for spots, discoloration, or unusual patterns."
    ],
    fertilizer: [
      "Use the Fertilizer Recommendations page for personalized plans based on your crop, soil type, and growth stage.",
      "NPK ratios vary by crop: Wheat needs more Nitrogen, Rice needs balanced NPK, Sugarcane needs high Nitrogen and Potassium.",
      "Split fertilizer applications reduce losses. Apply Nitrogen in 2-3 splits for most crops."
    ],
    weather: [
      "Check the Weather Forecasts page for 7-day forecasts, hourly updates, and weather alerts for your region.",
      "Monitor rainfall predictions for irrigation planning. Heavy rain alerts help prevent waterlogging.",
      "Temperature and humidity affect crop growth. Optimal ranges vary by crop type."
    ],
    market: [
      "Visit the Mandi Prices page for live market rates across major mandis. Prices update regularly.",
      "Track price trends over 30 days to decide the best time to sell your produce.",
      "Different mandis may have different prices. Consider transport costs when choosing where to sell."
    ],
    irrigation: [
      "The Irrigation Reminders page helps schedule watering based on crop needs and weather forecasts.",
      "Drip irrigation saves 30-50% water compared to flood irrigation. Best for row crops.",
      "Water early morning or late evening to minimize evaporation losses."
    ],
    general: [
      "I can help with crop management, disease identification, fertilizer planning, weather forecasts, market prices, and irrigation scheduling.",
      "For specific advice, please provide details about your crop, location, and current conditions.",
      "Regular monitoring and timely interventions are key to successful farming."
    ]
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('namaste')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    if (msg.includes('disease') || msg.includes('sick') || msg.includes('spot') || msg.includes('fungus') || msg.includes('pest')) {
      return botResponses.disease[Math.floor(Math.random() * botResponses.disease.length)];
    }
    
    if (msg.includes('fertilizer') || msg.includes('fertiliser') || msg.includes('nutrient') || msg.includes('npk') || msg.includes('urea') || msg.includes('dap')) {
      return botResponses.fertilizer[Math.floor(Math.random() * botResponses.fertilizer.length)];
    }
    
    if (msg.includes('weather') || msg.includes('rain') || msg.includes('temperature') || msg.includes('forecast') || msg.includes('climate')) {
      return botResponses.weather[Math.floor(Math.random() * botResponses.weather.length)];
    }
    
    if (msg.includes('price') || msg.includes('market') || msg.includes('mandi') || msg.includes('sell') || msg.includes('rate')) {
      return botResponses.market[Math.floor(Math.random() * botResponses.market.length)];
    }
    
    if (msg.includes('irrigat') || msg.includes('water') || msg.includes('watering') || msg.includes('drip') || msg.includes('sprinkler')) {
      return botResponses.irrigation[Math.floor(Math.random() * botResponses.irrigation.length)];
    }
    
    return botResponses.general[Math.floor(Math.random() * botResponses.general.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    setIsTyping(true);
    
    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Chat cleared. How can I help you now?',
        timestamp: new Date()
      }
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-green-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Farming Assistant</h3>
            <p className="text-xs opacity-80">Online • Responds in seconds</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={clearChat} className="p-2 hover:bg-white/20 rounded" title="Clear chat">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded" title="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
              <div className={`rounded-2xl px-4 py-2.5 ${message.type === 'user' 
                ? 'bg-green-600 text-white rounded-br-none' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <p className={`text-xs text-gray-400 dark:text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-2xl rounded-bl-none px-4 py-2.5">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about farming..."
            className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
          Ask about diseases, fertilizers, weather, market prices, irrigation...
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;