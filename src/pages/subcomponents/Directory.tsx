import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Search, Filter, MapPin, MessageSquare, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardSidebar from './DashboardSidebar';


const Directory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const doctors = [
    {
      id: 1,
      fullName: 'Dr. Sarah Johnson',
      specialization: ['Cardiology', 'Internal Medicine'],
      qualifications: 'MBBS, MD, FACC',
      location: { city: 'New York', state: 'NY', country: 'USA' },
      clinicName: 'Manhattan Heart Center',
      yearsOfExperience: 15,
      profilePicture: '/placeholder.svg',
      isOnline: true,
      contactNumber: '+1-555-0123',
      medicalRegistrationNumber: 'NY123456',
      verified: true
    },
    {
      id: 2,
      fullName: 'Dr. Michael Chen',
      specialization: ['Neurology'],
      qualifications: 'MBBS, MD, DM (Neurology)',
      location: { city: 'Los Angeles', state: 'CA', country: 'USA' },
      clinicName: 'Pacific Neurology Institute',
      yearsOfExperience: 12,
      profilePicture: '/placeholder.svg',
      isOnline: false,
      contactNumber: '+1-555-0124',
      medicalRegistrationNumber: 'CA789012',
      verified: true
    },
    {
      id: 3,
      fullName: 'Dr. Emily Rodriguez',
      specialization: ['Pediatrics', 'Neonatology'],
      qualifications: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
      location: { city: 'Chicago', state: 'IL', country: 'USA' },
      clinicName: "Children's Medical Center",
      yearsOfExperience: 8,
      profilePicture: '/placeholder.svg',
      isOnline: true,
      contactNumber: '+1-555-0125',
      medicalRegistrationNumber: 'IL345678',
      verified: true
    },
    {
      id: 4,
      fullName: 'Dr. James Wilson',
      specialization: ['Orthopedic Surgery'],
      qualifications: 'MBBS, MS (Orthopedics)',
      location: { city: 'Houston', state: 'TX', country: 'USA' },
      clinicName: 'Texas Orthopedic Specialists',
      yearsOfExperience: 20,
      profilePicture: '/placeholder.svg',
      isOnline: false,
      contactNumber: '+1-555-0126',
      medicalRegistrationNumber: 'TX901234',
      verified: true
    },
    {
      id: 5,
      fullName: 'Dr. Lisa Park',
      specialization: ['Dermatology'],
      qualifications: 'MBBS, MD (Dermatology)',
      location: { city: 'Miami', state: 'FL', country: 'USA' },
      clinicName: 'Sunshine Dermatology Clinic',
      yearsOfExperience: 6,
      profilePicture: '/placeholder.svg',
      isOnline: true,
      contactNumber: '+1-555-0127',
      medicalRegistrationNumber: 'FL567890',
      verified: false
    }
  ];

  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedic Surgery', 'Dermatology', 'Internal Medicine'];
  const locations = ['all', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL'];
  const experienceRanges = ['all', '0-5 years', '6-10 years', '11-15 years', '16+ years'];

  const getExperienceRange = (years: number) => {
    if (years <= 5) return '0-5 years';
    if (years <= 10) return '6-10 years';
    if (years <= 15) return '11-15 years';
    return '16+ years';
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         doctor.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${doctor.location.city}, ${doctor.location.state}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            doctor.specialization.some(spec => spec === selectedSpecialty);
    
    const locationString = `${doctor.location.city}, ${doctor.location.state}`;
    const matchesLocation = selectedLocation === 'all' || locationString === selectedLocation;
    
    const doctorExperienceRange = getExperienceRange(doctor.yearsOfExperience);
    const matchesExperience = selectedExperience === 'all' || doctorExperienceRange === selectedExperience;
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesExperience;
  });

  return (
    <div>
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold ml-4"> Directory</h1>
          </div>
          <div className="hidden md:block text-sm text-muted-foreground">
  {filteredDoctors.length} doctors found
</div>
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
                  placeholder="Search by name, specialty, clinic, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full lg:w-48 border-black">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full lg:w-48 border-black">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger className="w-full lg:w-48 border-black">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range === 'all' ? 'All Experience' : range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={doctor.profilePicture} />
                    <AvatarFallback className="text-lg">
                      {doctor.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                    doctor.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <CardTitle className="text-lg">{doctor.fullName}</CardTitle>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {doctor.isOnline ? 'Online' : 'Offline'}
                  </span>
                  {doctor.verified && (
                    <Badge variant="default" className="text-xs">Verified</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Specializations:</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{spec}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">Qualifications:</h4>
                    <p className="text-sm text-muted-foreground">{doctor.qualifications}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1">Clinic:</h4>
                    <p className="text-sm text-muted-foreground">{doctor.clinicName}</p>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {doctor.location.city}, {doctor.location.state}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>{doctor.yearsOfExperience}</strong> years of experience
                  </div>

                  <div className="flex space-x-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate('/doctor-profile', { state: { doctor } })}>
                      <User className="h-4 w-4 mr-2"   />
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate('/chat')}>
                      <MessageSquare className="h-4 w-4 mr-2"   />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </div>
  );
};

export default Directory;