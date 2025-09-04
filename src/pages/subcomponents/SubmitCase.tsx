import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitCase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const specialties = ['Cardiology', 'Neurology', 'Pediatrics', 'Internal Medicine', 'Surgery'];
  const caseTypes = ['Clinical', 'Medico-Legal'];

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    specialty: '',
    type: '',
    diagnosis: '',
    outcome: '',
    tags: '',
    publishDate: '',
    imageFiles: [] as File[],
  });

  const handleChange = (field: string, value: string | File[] | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('author', formData.author);
      payload.append('specialty', formData.specialty);
      payload.append('type', formData.type);
      payload.append('diagnosis', formData.diagnosis);
      payload.append('outcome', formData.outcome);
      payload.append('tags', formData.tags);
      payload.append('publishDate', formData.publishDate);

      // append all selected images
      formData.imageFiles.forEach((file) => {
        payload.append('images', file);
      });

      // 🔁 Replace with real API endpoint
      // await fetch('/api/cases', { method: 'POST', body: payload });

      toast({
        title: "Case Submitted",
        description: "Your case has been successfully submitted.",
      });

      navigate('/case-discussions');
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your case.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="max-w-4xl mx-auto px-4 py-8">
       {/* <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/case-discussions')} className="text-black">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case Discussions
          </Button>
        </div>*/}

        <Card>
          <CardHeader>
            <CardTitle>Submit Case</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Author (Doctor)</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="e.g., Dr. Jane Doe"
                  />
                </div>

                {/* Case Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {caseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={formData.specialty}
                    onValueChange={(value) => handleChange('specialty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Publish Date */}
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => handleChange('publishDate', e.target.value)}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    placeholder="e.g., seizure, pediatric"
                  />
                </div>

                {/* Diagnosis */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => handleChange('diagnosis', e.target.value)}
                    rows={3}
                    placeholder="Describe the diagnosis..."
                  />
                </div>

                {/* Outcome */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="outcome">Outcome</Label>
                  <Textarea
                    id="outcome"
                    value={formData.outcome}
                    onChange={(e) => handleChange('outcome', e.target.value)}
                    rows={3}
                    placeholder="Describe the outcome or result..."
                  />
                </div>

                {/* Multiple Image Upload */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="imageFiles">Upload Images (you can select multiple)</Label>
                  <Input
                    id="imageFiles"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleChange('imageFiles', Array.from(e.target.files));
                      }
                    }}
                  />
                  {formData.imageFiles.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {formData.imageFiles.length} image(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Submit / Cancel */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-black text-white hover:bg-neutral-800">
                  <Save className="h-4 w-4 mr-2" />
                  Submit Case
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-black border-black hover:bg-gray-100"
                  onClick={() => navigate('/case-discussions')}
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

export default SubmitCase;
