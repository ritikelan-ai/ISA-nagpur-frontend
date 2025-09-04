import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Download,
  MessageCircle,
  ArrowLeft,
  MessageSquare,
  Eye,
  Edit,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

const CaseChat = ({ onClose }: { onClose: () => void }) => {
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
          <h2 className="font-semibold text-lg">Case Chat</h2>
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


const CaseDetails = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  // 🔹 Mock case data (replace with props or API call)
  const [caseItem, setCaseItem] = useState({
    id: 1,
    title: "Complex Cardiac Arrhythmia in 45-year-old Patient",
    description:
      "Patient presents with recurrent episodes of palpitations and dizziness. ECG shows irregular rhythm with variable R-R intervals.",
    author: "Dr. Sarah Johnson",
    authorSpecialty: "Cardiology",
    type: "Clinical",
    specialty: "Cardiology",
    publishDate: "2024-01-15",
    viewsCount: 156,
    commentsCount: 23,
    diagnosis: "Atrial Fibrillation with Rapid Ventricular Response",
    outcome: "Patient stabilized with rate control medication",
    tags: ["arrhythmia", "atrial fibrillation", "emergency"],
    hasImages: true,
    images: ["https://cdn1.imaios.com/imaios-images/web/images/eanatomy/modules/brain3dmri/brain3dmri-couv.jpg?q=80&s=d6e3bdaf64805e0b270a508003cba4c7&Expires=1788379215&Signature=ZPf579bDsW6KKE41gqftUjXiMU2TX9hyPLbjUPzTEd1m4rnoXH7ncAFztJCpmTqIpn0opfEeo3G1c-IkecuDeViTB2gxnFuG9Bu-paZg0vg7PJwD0ErejmTDgNVA79P3WXaQbHPfXfXwmiSsOIl~nTxAhcRRl0oP4Z56RM3FiAA1ttDq-BDVnjnbtVZ6vVgM9PGu0F-d0lSPLygDh2m6-~DwA5JojglzuCbLm-73nRTttRisehb0A2sU8kFRCXtOZmxc4a~eHInuuu1O85SQcotXsEXRQ48q-ACpdJskXm~KddhCgjHoJqRBu93Fjcra1O0W1BRHj-fCV7ZDOTaZIQ__&Key-Pair-Id=K1QCZ6EGMAIHLO", "https://sjra-media.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/05/10170236/Side-By-Side-Of-Brain-MRI-Scan-Results.webp"],
    pdfUrl: "/cases/case1.pdf",
    caseSolved: false, // 🔹 New field
  });

  // 🔹 State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(caseItem);

  // Handle text input/textarea changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    }
  };

  // Handle save
  const handleSave = () => {
    setCaseItem(formData); // update local state (later replace with API call)
    setIsEditing(false);
  };

  // Handle Case Solved
  const handleCaseSolved = () => {
    setCaseItem((prev) => ({ ...prev, caseSolved: true }));
  };

  return (
    
    <div className="min-h-screen bg-[#FFFFFF] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-lg rounded-2xl overflow-hidden border border-[#333333]/20 bg-[#FFFFFF]">
          {/* Header */}
          <CardHeader className="bg-[#000000] p-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              {caseItem.title}
            </CardTitle>
            <div className="flex items-center gap-3 mt-3 text-sm text-white flex-wrap">
              <Calendar className="h-4 w-4" />
              {new Date(caseItem.publishDate).toLocaleDateString()}
              <Badge className="bg-white text-[#333333]">{caseItem.type}</Badge>
              <Badge className="bg-[#6FCF97] {/*text-[#333333]*/}">
                {caseItem.specialty}
              </Badge>
              {caseItem.caseSolved && (
                <Badge className="bg-green-500 text-white">
                  Case Solved
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 text-[#333333]">
            {isEditing ? (
              // ----------------- Edit Form -----------------
              <div className="space-y-4">
                <div>
                  <label className="font-medium block mb-1">Case Title</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Case Title"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">
                    Case Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Case Description"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">Diagnosis</label>
                  <Textarea
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Diagnosis"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">Outcome</label>
                  <Textarea
                    name="outcome"
                    value={formData.outcome}
                    onChange={handleChange}
                    placeholder="Outcome"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    name="tags"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim()),
                      })
                    }
                    placeholder="Tags"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">
                    Upload Case Images
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    {formData.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`preview-${i}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-black hover:bg-[#333333] text-white px-5 py-2 rounded-lg"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // ----------------- Read-only Case Details -----------------
              <>
                {/* Author Info */}
                <div>
                  <h2 className="font-semibold text-lg mb-1">Author</h2>
                  <p className="text-[#333333]/80">
                    {caseItem.author} ({caseItem.authorSpecialty})
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-semibold text-lg mb-1">
                    Case Description
                  </h2>
                  <p className="text-[#333333]/80 leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>

                {/* Images */}
                {caseItem.hasImages && caseItem.images && (
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Images</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {caseItem.images.map((img, i) => (
                       <img
                       key={i}
                       src={img}
                       alt={`figure-${i}`}
                       onClick={() => setSelectedImage(img)}
                       className="w-full h-56 object-cover rounded-lg shadow-md border border-[#333333]/10 cursor-pointer hover:opacity-90 transition"
                     />
                      ))}
                    </div>
                  </div>
                )}

                {/* Diagnosis & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="font-semibold text-lg mb-1">Diagnosis</h2>
                    <p className="text-[#333333]/80">{caseItem.diagnosis}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-1">Outcome</h2>
                    <p className="text-[#333333]/80">{caseItem.outcome}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      className="px-3 py-1 text-sm bg-[#6FCF97]  {/*text-[#333333]*/}  rounded-full"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-[#333333]/70 mt-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {caseItem.viewsCount} views
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {caseItem.commentsCount} comments
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6 flex-wrap">
                  {/*<a
                    href={caseItem.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black hover:bg-[#333333] text-white px-5 py-2 rounded-lg shadow-md transition"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                   */}
                  <Button
                    onClick={() => setChatOpen(true)}
                    className="flex items-center gap-2 bg-black hover:bg-[#333333] text-white px-5 py-2 rounded-lg shadow-md transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                     Discuss
                  </Button>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-black hover:bg-[#333333] text-white px-5 py-2 rounded-lg shadow-md transition"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Case
                  </Button>
                  <Button
                    onClick={handleCaseSolved}
                    disabled={caseItem.caseSolved}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-md transition ${
                      caseItem.caseSolved
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-black hover:bg-[#333333] text-white"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {caseItem.caseSolved ? "Solved" : "Mark as Solved"}
                  </Button>
                  <Button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 bg-black hover:bg-[#333333] text-white px-5 py-2 rounded-lg shadow-md transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

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

      {chatOpen && <CaseChat onClose={() => setChatOpen(false)} />}
        
    </div>
  );
};

export default CaseDetails;
