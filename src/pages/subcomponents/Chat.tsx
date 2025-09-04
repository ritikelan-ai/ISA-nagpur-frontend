import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Search, Paperclip, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      lastMessage: 'Thanks for sharing that research paper!',
      time: '2 min ago',
      unread: 2,
      online: true,
      avatar: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Neurology',
      lastMessage: 'The case study results are interesting.',
      time: '1 hour ago',
      unread: 0,
      online: false,
      avatar: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Pediatrics',
      lastMessage: 'Could you review this diagnosis?',
      time: '3 hours ago',
      unread: 1,
      online: true,
      avatar: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Dr. Doxy Willson',
      specialization: 'Urology',
      lastMessage: 'Could you review this diagnosis?',
      time: '3 hours ago',
      unread: 1,
      online: true,
      avatar: '/placeholder.svg',
    },
    {
      id: 5,
      name: 'Dr. Ema Singh',
      specialization: 'Neurology',
      lastMessage: 'Could you review this diagnosis?',
      time: '3 hours ago',
      unread: 1,
      online: true,
      avatar: '/placeholder.svg',
    },
  ];

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 2,
        text: 'Hi! I wanted to discuss the latest cardiology guidelines.',
        type: 'text',
        time: '10:30 AM',
        delivered: true,
        seen: true,
      },
      {
        id: 2,
        senderId: 1,
        text: 'Absolutely! I found some interesting points in the recent ACC/AHA guidelines.',
        type: 'text',
        time: '10:32 AM',
        delivered: true,
        seen: true,
      },
    ],
    2: [],
    3: [],
  });

  const sendMessage = () => {
    if (message.trim()) {
      const newMsg = {
        id: (messages[selectedChat]?.length || 0) + 1,
        senderId: 1,
        text: message.trim(),
        type: 'text',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        delivered: true,
        seen: false,
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg],
      }));

      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMsg = {
        id: (messages[selectedChat]?.length || 0) + 1,
        senderId: 1,
        text: file.name,
        fileUrl: reader.result,
        type: 'file',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        delivered: true,
        seen: false,
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg],
      }));
    };

    reader.readAsDataURL(file);
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header (hide on mobile, show on desktop) */}
      <div className="hidden md:block bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold ml-4">Messages</h1>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Section */}
        <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden'} md:flex`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-card border-b p-4 flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSelectedChat(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={conversations.find(c => c.id === selectedChat)?.avatar} />
                  <AvatarFallback>
                    {conversations.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{conversations.find(c => c.id === selectedChat)?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {conversations.find(c => c.id === selectedChat)?.specialization} •
                    {conversations.find(c => c.id === selectedChat)?.online ? ' Online' : ' Offline'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages[selectedChat] || []).map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.senderId === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.type === 'file' ? (
                        <a
                          href={msg.fileUrl}
                          download={msg.text}
                          className="underline text-sm hover:text-blue-600 transition"
                        >
                          📎 {msg.text}
                        </a>
                      ) : (
                        <p className="text-sm">{msg.text}</p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.senderId === 1 && (
                          <div className="flex items-center space-x-1">
                            <div className={`w-1 h-1 rounded-full ${msg.delivered ? 'bg-current' : 'bg-muted-foreground'}`} />
                            <div className={`w-1 h-1 rounded-full ${msg.seen ? 'bg-current' : 'bg-muted-foreground'}`} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="bg-card border-t p-4 relative">
                <div className="flex items-center space-x-2 min-w-0">
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} />
                  <Button variant="ghost" size="sm" onClick={() => fileInputRef.current.click()}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative min-w-0">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={sendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {showEmojiPicker && (
                  <div className="absolute bottom-16 right-4 z-50 bg-white shadow-lg border rounded">
                    <EmojiPicker onEmojiClick={onEmojiClick} height={350} width={300} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <img
                    src="https://www.isanagpur.org/wp-content/uploads/2021/06/isa-icon.png.webp"
                    alt="ISA Logo"
                    className="w-16 h-16"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Indian Society of Anaesthesiologists</h3>
                <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div
          className={`w-full md:w-80 bg-card flex flex-col 
          ${selectedChat ? 'hidden md:flex' : 'flex'} md:border-l`}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${selectedChat === conv.id ? 'bg-muted' : ''}`}
                onClick={() => setSelectedChat(conv.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{conv.specialization}</p>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="default" className="text-xs">{conv.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
