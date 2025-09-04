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
  MessageSquare,
  Flag,
  Calendar,
  Eye,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

const CaseDiscussions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [flaggedCases, setFlaggedCases] = useState<number[]>([]);
  const [chatOpen, setChatOpen] = useState(false); // ✅ FIX: added missing state

  const cases = [
    {
      id: 1,
      title: 'Complex Cardiac Arrhythmia in 45-year-old Patient',
      description:
        'Patient presents with recurrent episodes of palpitations and dizziness. ECG shows irregular rhythm with variable R-R intervals.',
      author: 'Dr. Sarah Johnson',
      authorSpecialty: 'Cardiology',
      type: 'Clinical',
      specialty: 'Cardiology',
      publishDate: '2024-01-15',
      viewsCount: 156,
      commentsCount: 23,
      diagnosis: 'Atrial Fibrillation with Rapid Ventricular Response',
      outcome: 'Patient stabilized with rate control medication',
      tags: ['arrhythmia', 'atrial fibrillation', 'emergency'],
      hasImages: true,
    },
    {
      id: 2,
      title: 'Medico-legal Case: Informed Consent in Emergency Surgery',
      description:
        'Discussion on the challenges of obtaining proper informed consent during emergency surgical procedures.',
      author: 'Dr. Michael Chen',
      authorSpecialty: 'Surgery',
      type: 'Medico-Legal',
      specialty: 'Surgery',
      publishDate: '2024-01-12',
      viewsCount: 89,
      commentsCount: 17,
      diagnosis: 'Legal/Ethical Consultation',
      outcome: 'Case study for medical ethics guidelines',
      tags: ['informed consent', 'emergency surgery', 'medical ethics'],
      hasImages: false,
    },
    {
      id: 3,
      title: 'Pediatric Seizure Management in Resource-Limited Setting',
      description:
        'Managing febrile seizures in a 3-year-old child in a clinic with limited diagnostic resources.',
      author: 'Dr. Emily Rodriguez',
      authorSpecialty: 'Pediatrics',
      type: 'Clinical',
      specialty: 'Pediatrics',
      publishDate: '2024-01-10',
      viewsCount: 201,
      commentsCount: 31,
      diagnosis: 'Febrile Seizure',
      outcome: 'Successfully managed with supportive care',
      tags: ['pediatric', 'seizure', 'resource-limited'],
      hasImages: true,
    },
  ];

  const types = ['all', 'Clinical', 'Medico-Legal'];
  const specialties = [
    'all',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Surgery',
    'Internal Medicine',
  ];

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || caseItem.type === selectedType;
    const matchesSpecialty = selectedSpecialty === 'all' || caseItem.specialty === selectedSpecialty;

    return matchesSearch && matchesType && matchesSpecialty;
  });

  const toggleFlag = (id: number) => {
    setFlaggedCases((prev) =>
      prev.includes(id) ? prev.filter((flagId) => flagId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
            <h1 className="text-2xl font-bold ml-4 text-black">Case Discussions</h1>
          </div>

          {/* Post Case button (Desktop only) */}
          <Button
            className="bg-black text-white hover:bg-gray-800 hidden md:flex"
            onClick={() => navigate('/submit-case')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post Case
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full lg:w-48 border-black">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Case Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full lg:w-48 border-black">
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

              {/* Post Case button (Mobile only) */}
              <Button
                className="bg-black text-white hover:bg-gray-800 w-full md:hidden"
                onClick={() => navigate('/submit-case')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Case
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-6">
          {filteredCases.map((caseItem) => {
            const isFlagged = flaggedCases.includes(caseItem.id);

            return (
              <Card key={caseItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle
                          className="text-xl text-black cursor-pointer hover:text-blue-600 flex items-center gap-2"
                          onClick={() => navigate('/case-detail')}
                        >
                          {caseItem.title}
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
                        {isFlagged && <Flag className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={`/placeholder.svg`} />
                            <AvatarFallback className="text-xs">
                              {caseItem.author
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{caseItem.author}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{caseItem.authorSpecialty}</span>
                        </div>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(caseItem.publishDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant={caseItem.type === 'Clinical' ? 'default' : 'secondary'}>
                          {caseItem.type}
                        </Badge>
                        <Badge variant="outline">{caseItem.specialty}</Badge>
                        {caseItem.hasImages && (
                          <Badge variant="outline" className="text-xs">
                            📷 Images
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{caseItem.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Diagnosis:</h4>
                      <p className="text-sm text-muted-foreground">{caseItem.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Outcome:</h4>
                      <p className="text-sm text-muted-foreground">{caseItem.outcome}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {caseItem.viewsCount} views
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {caseItem.commentsCount} comments
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-black border-black"
                        onClick={() => setChatOpen(true)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Join Discussion
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFlag(caseItem.id)}
                        className={isFlagged ? 'text-red-500' : 'text-black'}
                      >
                        <Flag className="h-4 w-4 mr-2" />
                        {isFlagged ? 'Flagged' : 'Flag'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No cases found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
      {chatOpen && <CaseChat onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default CaseDiscussions;
