import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, MessageCircle, ArrowLeft, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const ResarchChat = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to Case Chat!',
      sender: 'Bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [messagesEndRef, setMessagesEndRef] = useState<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage, sender: 'You', time }]);
      setNewMessage('');
      messagesEndRef?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="flex flex-col h-[90vh] w-[90vw] max-w-3xl rounded-xl shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-black to-gray-800 text-white">
          <h2 className="font-semibold text-lg">Research Chat</h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
              <span className="text-xs font-semibold text-gray-500 mb-1">{msg.sender}</span>
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
          <div ref={setMessagesEndRef} />
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
          <Button onClick={sendMessage} className="bg-black hover:bg-gray-800 text-white rounded-full p-2">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResearchPaperDetails = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 🔹 Mock paper data (replace with props or API call)
  const paper = {
    id: 1,
    title: "Novel Approaches in Cardiovascular Therapy: A Comprehensive Review",
    authors: ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Rodriguez"],
    abstract:
      "Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: ...",
    description:
      "<p>Paragraphs are the building blocks of papers. ...</p> <p>Before you can begin ...</p>",
    category: "Clinical Research",
    specialty: "Cardiology",
    publishDate: "2024-01-15",
    tags: ["cardiovascular", "therapy", "precision medicine"],
    pdfUrl: "/research/paper1.pdf",
    images: [
      "https://www.shutterstock.com/image-vector/circulatory-system-human-heart-600nw-2485247449.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkEKXSX8imJwIVoUH5w6j8EQE1STJueXFOA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8cEP2vH0_D9bDPJa8VL5JMcVS-q8M5rYSBQ&s",
      "https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs15010-020-01467-8/MediaObjects/15010_2020_1467_Fig1_HTML.jpg",
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-2xl overflow-hidden border border-[#333333]/20 bg-[#FFFFFF]">
          {/* Header with Black */}
          <CardHeader className="bg-[#000000] p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              {paper.title}
            </CardTitle>
            <div className="flex items-center gap-3 mt-3 text-sm text-white flex-wrap">
              <Calendar className="h-4 w-4" />
              {new Date(paper.publishDate).toLocaleDateString()}
              <Badge className="bg-white text-[#333333]">{paper.category}</Badge>
              <Badge className="bg-[#6FCF97]">{paper.specialty}</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 text-[#333333]">
            {/* Authors */}
            <div>
              <h2 className="font-semibold text-lg mb-1">Authors</h2>
              <p className="text-[#333333]/80">{paper.authors.join(", ")}</p>
            </div>

            {/* Abstract */}
            <div>
              <h2 className="font-semibold text-lg mb-1">Abstract</h2>
              <p className="text-[#333333]/80 leading-relaxed">{paper.abstract}</p>
            </div>

            {/* Images */}
            {paper.images && (
  <div>
    <h2 className="font-semibold text-lg mb-2">Images</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {paper.images.map((img, i) => (
        <div
          key={i}
          className="w-full h-64 flex items-center justify-center bg-white rounded-lg shadow-md border border-[#333333]/10 cursor-pointer"
          onClick={() => setSelectedImage(img)}
        >
          <img
            src={img}
            alt={`figure-${i}`}
            className="max-h-full max-w-full object-contain rounded-md"
          />
        </div>
      ))}
    </div>
  </div>
)}


            {/* Description */}
            <div>
              <h2 className="font-semibold text-lg mb-1">Detailed Description</h2>
              <div
                className="prose max-w-none text-[#333333]/90"
                dangerouslySetInnerHTML={{ __html: paper.description }}
              />
            </div>

            {/* Tags (Responsive) */}
            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag, i) => (
                <Badge
                  key={i}
                  className="px-3 py-1 text-xs sm:text-sm bg-[#6FCF97] rounded-full"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Buttons (Responsive) */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-black hover:bg-[#333333] text-white px-4 sm:px-5 py-2 rounded-lg shadow-md transition text-sm sm:text-base w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <Button
                onClick={() => setChatOpen(true)}
                className="flex items-center justify-center gap-2 bg-black hover:bg-[#333333] text-white px-4 sm:px-5 py-2 rounded-lg shadow-md transition text-sm sm:text-base w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss
              </Button>
              <Button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-black hover:bg-[#333333] text-white px-4 sm:px-5 py-2 rounded-lg shadow-md transition text-sm sm:text-base w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Modal */}
      {chatOpen && <ResarchChat onClose={() => setChatOpen(false)} />}

      {/* Image Modal */}
      {selectedImage && (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
    {/* Back button fixed at screen corner */}
    <Button
      variant="ghost"
      onClick={() => setSelectedImage(null)}
      className="absolute top-4 left-4 text-white hover:bg-gray-700 flex items-center gap-2"
    >
      <ArrowLeft className="h-6 w-6" />
      Back
    </Button>

    {/* Image container with proper sizing */}
    <div className="relative max-w-4xl w-auto">
      <img
        src={selectedImage}
        alt="Selected"
        className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-lg"
      />
    </div>
  </div>
)}

    </div>
  );
};

export default ResearchPaperDetails;
