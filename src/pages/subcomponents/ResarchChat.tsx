
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User } from 'lucide-react';

const ResarchChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to Case Chat!',
      sender: 'Bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage, sender: 'You', time }]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen border max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-black to-gray-800 text-white">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-white hover:bg-gray-700">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <h2 className="font-semibold text-lg">Case Chat</h2>
        <User className="h-6 w-6" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Name */}
            <span className="text-xs font-semibold text-gray-500 mb-1">{msg.sender}</span>

            {/* Message Bubble */}
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${
                msg.sender === 'You'
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-white text-black border rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[10px] text-gray-400 mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t bg-white">
        <Input
          placeholder="Type a message..."
          className="flex-1 border-gray-300 rounded-full px-4"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button
          onClick={sendMessage}
          className="bg-black hover:bg-gray-800 text-white rounded-full p-2"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
export default ResarchChat;
