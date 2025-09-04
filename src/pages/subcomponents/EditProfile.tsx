import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    specialization: user?.specialization.join(', ') || '',
    qualifications: user?.qualifications || '',
    contactNumber: user?.contactNumber || '',
    clinicName: user?.clinicName || '',
    city: user?.location.city || '',
    state: user?.location.state || '',
    country: user?.location.country || '',
    medicalRegistrationNumber: user?.medicalRegistrationNumber || '',
    yearsOfExperience: user?.yearsOfExperience.toString() || '',
    isaNumber: user?.isaNumber || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        ...formData,
        specialization: formData.specialization.split(',').map(s => s.trim()),
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country
        }
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          {/*<Button variant="ghost" onClick={() => navigate('/profile')} className="text-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>*/}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Not Editable)</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)} value={formData.gender}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization (comma separated)</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="e.g., Cardiology, Internal Medicine"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalRegistrationNumber">Medical Registration Number</Label>
                  <Input
                    id="medicalRegistrationNumber"
                    value={formData.medicalRegistrationNumber}
                    onChange={(e) => handleInputChange('medicalRegistrationNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isaNumber">ISA Number</Label>
                  <Input
                    id="isaNumber"
                    value={formData.isaNumber}
                    onChange={(e) => handleInputChange('isaNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic/Hospital Name</Label>
                  <Input
                    id="clinicName"
                    value={formData.clinicName}
                    onChange={(e) => handleInputChange('clinicName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">Qualifications</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  placeholder="e.g., MBBS, MD, Fellowship details"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className=" flex-1 bg-black text-white hover:bg-neutral-800"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className=" flex-1 text-black border-black hover:bg-gray-100"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
