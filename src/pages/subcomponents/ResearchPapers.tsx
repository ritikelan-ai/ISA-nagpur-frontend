import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  FileText,
  MessageSquare,
  Download,
  Calendar,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const ResearchPapers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);

  const papers = [
    {
      id: 1,
      title: 'Novel Approaches in Cardiovascular Therapy: A Comprehensive Review',
      abstract:
        'This research explores innovative therapeutic approaches for cardiovascular diseases, focusing on precision medicine and personalized treatment protocols.',
      authors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'],
      category: 'Clinical Research',
      specialty: 'Cardiology',
      publishDate: '2024-01-15',
      downloadCount: 234,
      commentsCount: 12,
      tags: ['cardiovascular', 'therapy', 'precision medicine'],
      pdfUrl: '/research/paper1.pdf'
    },
    {
      id: 2,
      title: 'Neurological Implications of Post-COVID Syndrome',
      abstract:
        'An in-depth analysis of neurological symptoms and long-term effects observed in post-COVID patients, with recommendations for treatment protocols.',
      authors: ['Dr. James Wilson', 'Dr. Lisa Park'],
      category: 'Case Study',
      specialty: 'Neurology',
      publishDate: '2024-01-10',
      downloadCount: 189,
      commentsCount: 8,
      tags: ['neurology', 'COVID-19', 'post-viral syndrome'],
      pdfUrl: '/research/paper2.pdf'
    },
    {
      id: 3,
      title: 'Pediatric Emergency Medicine: New Guidelines and Protocols',
      abstract:
        'Updated guidelines for pediatric emergency care, including new protocols for common pediatric emergencies and trauma management.',
      authors: ['Dr. Emily Rodriguez', 'Dr. David Kim'],
      category: 'Guidelines',
      specialty: 'Pediatrics',
      publishDate: '2024-01-08',
      downloadCount: 156,
      commentsCount: 15,
      tags: ['pediatrics', 'emergency medicine', 'guidelines'],
      pdfUrl: '/research/paper3.pdf'
    }
  ];

  const categories = ['all', 'Clinical Research', 'Case Study', 'Guidelines', 'Review Article'];
  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Internal Medicine', 'Surgery'];

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      paper.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesSpecialty = selectedSpecialty === 'all' || paper.specialty === selectedSpecialty;

    return matchesSearch && matchesCategory && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2 text-black" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-black ml-4">Research Papers</h1>
          </div>

          {/* Show this button only on lg+ */}
          <Button
            className="bg-black text-white hover:opacity-80 hidden lg:flex"
            onClick={() => navigate('/submit-paper')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Paper
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col lg:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search papers by title, authors, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48 border-black text-black">
                    <Filter className="h-4 w-4 mr-2 text-black hidden sm:inline" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Specialty Filter */}
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-full lg:w-48 border-black text-black">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Paper button only for mobile/tablet */}
              <Button
                className="bg-black text-white hover:opacity-80 flex lg:hidden"
                onClick={() => navigate('/submit-paper')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Paper
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                  <CardTitle
  className="text-xl text-black cursor-pointer hover:text-blue-600 flex items-center gap-2"
  onClick={() => navigate('/resarch-paper-detail')}
>
  {paper.title}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-5 h-5 text-blue-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19L19 5M19 5H9m10 0v10"
    />
  </svg>
</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(paper.publishDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{paper.category}</Badge>
                      <Badge variant="secondary">{paper.specialty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.authors.map((author, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={`/placeholder.svg`} />
                            <AvatarFallback className="text-xs">
                              {author.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{author}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{paper.abstract}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {paper.downloadCount} downloads
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {paper.commentsCount} comments
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-black border-black w-full sm:w-auto"
                    >
                      <FileText className="h-4 w-4 mr-2 text-black" />
                      View PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-black border-black w-full sm:w-auto"
                      onClick={() => setChatOpen(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2 text-black" />
                      Discuss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-black">No papers found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
      {chatOpen && <ResarchChat onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default ResearchPapers;
