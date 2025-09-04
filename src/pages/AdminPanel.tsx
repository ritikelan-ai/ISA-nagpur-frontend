import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Check, X, Flag, Mail, Download, Users, FileText, MessageSquare, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not admin
  if (!user || user.userType !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  const pendingDoctors = [
    {
      id: 1,
      fullName: 'Dr. Amanda Foster',
      email: 'amanda.foster@email.com',
      specialization: ['Dermatology'],
      qualifications: 'MBBS, MD (Dermatology)',
      location: { city: 'Boston', state: 'MA', country: 'USA' },
      clinicName: 'Boston Skin Care Center',
      yearsOfExperience: 7,
      medicalRegistrationNumber: 'MA123789',
      isaNumber: 'ISA567890',
      contactNumber: '+1-555-0128',
      registrationDate: '2024-01-16'
    },
    {
      id: 2,
      fullName: 'Dr. Robert Kim',
      email: 'robert.kim@email.com',
      specialization: ['Psychiatry'],
      qualifications: 'MBBS, MD (Psychiatry)',
      location: { city: 'Seattle', state: 'WA', country: 'USA' },
      clinicName: 'Pacific Mental Health',
      yearsOfExperience: 10,
      medicalRegistrationNumber: 'WA456123',
      isaNumber: 'ISA234567',
      contactNumber: '+1-555-0129',
      registrationDate: '2024-01-15'
    }
  ];

  const flaggedContent = [
    {
      id: 1,
      type: 'Research Paper',
      title: 'Controversial Treatment Methods in Oncology',
      author: 'Dr. John Doe',
      reportedBy: 'Dr. Sarah Johnson',
      reason: 'Unsubstantiated claims',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Case Discussion',
      title: 'Patient Privacy Concerns in Case Study',
      author: 'Dr. Jane Smith',
      reportedBy: 'Dr. Michael Chen',
      reason: 'Privacy violation',
      date: '2024-01-13',
      status: 'pending'
    }
  ];

  const systemStats = {
    totalUsers: 1247,
    pendingApprovals: 23,
    activeDiscussions: 156,
    researchPapers: 342,
    flaggedContent: 8,
    dailyActiveUsers: 89
  };

  const approveDoctor = (doctorId: number) => {
    console.log('Approving doctor:', doctorId);
    // Implement approval logic
  };

  const rejectDoctor = (doctorId: number) => {
    console.log('Rejecting doctor:', doctorId);
    // Implement rejection logic
  };

  const handleFlaggedContent = (contentId: number, action: 'approve' | 'remove') => {
    console.log(`${action} flagged content:`, contentId);
    // Implement content moderation logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold ml-4">Admin Panel</h1>
          </div>
          <Badge variant="default">Administrator</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{systemStats.pendingApprovals}</div>
              <div className="text-sm text-muted-foreground">Pending Approvals</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{systemStats.activeDiscussions}</div>
              <div className="text-sm text-muted-foreground">Active Discussions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{systemStats.researchPapers}</div>
              <div className="text-sm text-muted-foreground">Research Papers</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flag className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{systemStats.flaggedContent}</div>
              <div className="text-sm text-muted-foreground">Flagged Content</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2"></div>
              <div className="text-2xl font-bold">{systemStats.dailyActiveUsers}</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="pending-approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="flagged-content">Flagged Content</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <TabsTrigger value="system-tools">System Tools</TabsTrigger>
          </TabsList>

          {/* Pending Doctor Approvals */}
          <TabsContent value="pending-approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Doctor Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingDoctors.map((doctor) => (
                    <Card key={doctor.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {doctor.fullName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
                              <p className="text-sm text-muted-foreground">{doctor.email}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong>Specialization:</strong> {doctor.specialization.join(', ')}
                              </div>
                              <div>
                                <strong>Experience:</strong> {doctor.yearsOfExperience} years
                              </div>
                              <div>
                                <strong>Qualifications:</strong> {doctor.qualifications}
                              </div>
                              <div>
                                <strong>Location:</strong> {doctor.location.city}, {doctor.location.state}
                              </div>
                              <div>
                                <strong>Clinic:</strong> {doctor.clinicName}
                              </div>
                              <div>
                                <strong>Registration #:</strong> {doctor.medicalRegistrationNumber}
                              </div>
                              <div>
                                <strong>ISA #:</strong> {doctor.isaNumber}
                              </div>
                              <div>
                                <strong>Contact:</strong> {doctor.contactNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-4">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => rejectDoctor(doctor.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => approveDoctor(doctor.id)}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Content */}
          <TabsContent value="flagged-content">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((item) => (
                    <Card key={item.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{item.type}</Badge>
                              <Badge variant="destructive">Flagged</Badge>
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div><strong>Author:</strong> {item.author}</div>
                              <div><strong>Reported by:</strong> {item.reportedBy}</div>
                              <div><strong>Reason:</strong> {item.reason}</div>
                              <div><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFlaggedContent(item.id, 'approve')}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleFlaggedContent(item.id, 'remove')}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="user-management">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users by name, email, or registration number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button>Search</Button>
                  </div>
                  
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p>Enter search criteria to find and manage users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tools */}
          <TabsContent value="system-tools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export User Data (CSV)
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Research Papers
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Case Discussions
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Communications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send System Announcement
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Pending Users
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Flag className="h-4 w-4 mr-2" />
                    Content Moderation Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;