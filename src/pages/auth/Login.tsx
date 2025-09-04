import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      setOtpSent(true);
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

  {/*const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      await login(email, otp);
      toast({
        title: "Success",
        description: "Login successful",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid OTP",
        variant: "destructive",
      });
    }
  };*/}
  const handleLogin = async (e: React.FormEvent) => {
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
    await login(email, otp);
    toast({
      title: "Success",
      description: "Login successful",
    });
    navigate('/dashboard');
  } catch (error) {
    toast({
      title: "Error",
      description: "Invalid OTP",
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
            SignIn
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={otpSent}
              />
            </div>

            {!otpSent ? (
              <Button
                type="button"
                onClick={sendOTP}
                className="w-full bg-black text-white hover:bg-gray-900"
                disabled={isLoading}
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

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-900"
                >
                  Login
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

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/register')}
                className="text-[black]"
              >
                Don't have an account? Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
