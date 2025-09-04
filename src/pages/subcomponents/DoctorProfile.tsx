import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor; // receiving doctor data from Directory

  if (!doctor) {
    return (
      <p className="text-center mt-8 text-red-500">
        Doctor details not available.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center justify-start mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-[black]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1 bg-[#FFFFFF] border border-[#E0E0E0] shadow">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={doctor.profilePicture} />
                <AvatarFallback className="text-lg text-[#333333] bg-[#E0E0E0]">
                  {doctor.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-[#333333]">{doctor.fullName}</CardTitle>
              <div className="flex items-center justify-center mt-2">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    doctor.isOnline ? 'bg-[#6FCF97]' : 'bg-gray-400'
                  }`}
                ></div>
                <span className="text-sm text-[#333333]/60">
                  {doctor.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-[#333333]">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{doctor.email || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{doctor.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">
                    {doctor.location.city}, {doctor.location.state}, {doctor.location.country}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{doctor.dateOfBirth || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{doctor.yearsOfExperience} years experience</span>
                </div>

                {doctor.verified && (
                  <Badge className="bg-[#6FCF97] text-white mt-2">Verified</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card className="lg:col-span-2 bg-[#FFFFFF] border border-[#E0E0E0] shadow">
            <CardHeader>
              <CardTitle className="text-[black]">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#333333]">
              <div>
                <h3 className="font-semibold mb-2 flex items-center text-[#333333]">
                  <Award className="h-4 w-4 mr-2 text-[#2D9CDB]" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specialization.map((spec, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-[#2D9CDB] text-[#2D9CDB]"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Qualifications</h3>
                <p className="text-[#333333]/70">{doctor.qualifications}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Clinic/Hospital</h3>
                <p className="text-[#333333]/70">{doctor.clinicName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Medical Registration Number</h3>
                  <p className="text-[#333333]/70">{doctor.medicalRegistrationNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">ISA Number</h3>
                  <p className="text-[#333333]/70">{doctor.isaNumber || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Gender</h3>
                <p className="text-[#333333]/70">{doctor.gender || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
