import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope } from 'lucide-react';

const Register = () => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isaLocked, setIsaLocked] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    specialization: '',
    qualifications: '',
    contactNumber: '',
    clinicName: '',
    city: '',
    state: '',
    country: '',
    medicalRegistrationNumber: '',
    yearsOfExperience: '',
    isaNumber: '',
    isValidEmail: '',
    isIsaMember: false
  });

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isIsaNumberValid = (isaNumber: string) => {
    return /^[A-Za-z]{1}[0-9]{4}$/.test(isaNumber);
  };

  const sendOTP = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!isIsaNumberValid(formData.isaNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid ISA Number (1 letter followed by 4 digits)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      setOtpSent(true);
      setIsaLocked(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  {/*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        ...formData,
        specialization: [formData.specialization],
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country
        },
        userType: 'user',
        isOnline: false,
        isApproved: false
      });

      toast({
        title: "Registration Successful",
        description: "Your application is under review. You'll be notified once approved.",
      });

      navigate('/successful-registration');
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };
  */}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
  
    try {
      await register({
        ...formData,
        specialization: [formData.specialization],
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country
        },
        userType: 'user',
        isOnline: false,
        isApproved: false
      });
  
      toast({
        title: "Registration Successful",
        description: "Your application is under review. You'll be notified once approved.",
      });
  
      navigate('/successful-registration');
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAFF] p-4">
      <Card className="w-full max-w-md bg-[#FFFFFF] border border-[#E0E0E0] shadow-md rounded-lg">
        <CardHeader>
          <div className="mx-auto w-12 h-12 bg-[#2D9CDB]/10 rounded-full flex items-center justify-center mb-4 cursor-pointer"
          onClick={() => navigate("/")}>
            {/* <Stethoscope className="w-6 h-6 text-[#2D9CDB]" />*/}
           <img  src='https://www.isanagpur.org/wp-content/uploads/2021/06/isa-icon.png.webp'/>
          </div>
          <CardTitle className="text-2xl text-center text-[#333333] font-semibold">
            
            Indian Society of Anaesthesiologists
          </CardTitle>
          <CardDescription className="text-center text-[#555555]">
            SignUp
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#333333]">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={otpSent}
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-[#333333]">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                required
              />
            </div>

            {/* ISA Number + Checkbox in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isaNumber" className="text-[#333333]">ISA Number *</Label>
                <Input
                  id="isaNumber"
                  value={formData.isaNumber}
                  onChange={(e) => handleInputChange('isaNumber', e.target.value)}
                  required
                  disabled={isaLocked}
                  placeholder="E.g. A1234"
                />
              </div>

              <div className="flex items-center mt-6 space-x-2">
                <input
                  id="isaMember"
                  type="checkbox"
                  checked={formData.isIsaMember}
                  onChange={(e) => handleInputChange('isIsaMember', e.target.checked)}
                />
                <Label htmlFor="isaMember">Member of ISA Nagpur?</Label>
              </div>
            </div>

            {/* OTP / Buttons */}
            {!otpSent ? (
              <Button
                type="button"
                onClick={sendOTP}
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-[#333333]">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>

                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-900">
                  Register
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={sendOTP}
                  className="w-full border-black text-black hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </>
            )}

            {/* Login Link */}
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/login')}
                className="text-[black]"
              >
                Already have an account? Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
