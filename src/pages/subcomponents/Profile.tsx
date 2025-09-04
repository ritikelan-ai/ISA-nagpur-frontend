import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@/components/ui/avatar';
import {
  Edit,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-[black]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button
            onClick={() => navigate('/edit-profile')}
            className="bg-[black] text-white hover:bg-[#2089c5]"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1 bg-[#FFFFFF] border border-[#E0E0E0] shadow">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="text-lg text-[#333333] bg-[#E0E0E0]">
                  {user.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-[#333333]">{user.fullName}</CardTitle>
              <div className="flex items-center justify-center mt-2">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    user.isOnline ? 'bg-[#6FCF97]' : 'bg-gray-400'
                  }`}
                ></div>
                <span className="text-sm text-[#333333]/60">
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-[#333333]">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{user.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">
                    {user.location.city}, {user.location.state}, {user.location.country}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{user.dateOfBirth}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-[#2D9CDB]" />
                  <span className="text-sm">{user.yearsOfExperience} years experience</span>
                </div>
              </div>

              <div className="mt-4">
                <Badge
                  className={`${
                    user.isApproved
                      ? 'bg-[#6FCF97] text-white'
                      : 'bg-[#F2F2F2] text-[#333333]'
                  }`}
                >
                  {user.isApproved ? 'Approved' : 'Pending Approval'}
                </Badge>
                {user.userType === 'admin' && (
                  <Badge variant="outline" className="ml-2 border-[#2D9CDB] text-[#2D9CDB]">
                    Admin
                  </Badge>
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
                  {user.specialization.map((spec, index) => (
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
                <p className="text-[#333333]/70">{user.qualifications}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Clinic/Hospital</h3>
                <p className="text-[#333333]/70">{user.clinicName}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Medical Registration Number</h3>
                  <p className="text-[#333333]/70">{user.medicalRegistrationNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">ISA Number</h3>
                  <p className="text-[#333333]/70">{user.isaNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Gender</h3>
                <p className="text-[#333333]/70">{user.gender}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Activity Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-sm text-muted-foreground">Research Papers</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">18</div>
                <div className="text-sm text-muted-foreground">Case Discussions</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Messages Sent</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-sm text-muted-foreground">Comments Posted</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
