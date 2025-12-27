import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { addMockData } from '../../mock/data';

export const RegisterJobSeeker = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    careerGoals: '',
    resume: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobSeekerData = {
      name: formData.name,
      email: formData.email,
      skills: formData.skills.split(',').map(s => s.trim()),
      careerGoals: formData.careerGoals,
      resume: formData.resume,
    };
    
    addMockData('users', { ...jobSeekerData, role: 'jobseeker' });
    login({ email: formData.email, role: 'jobseeker', name: formData.name });
    setRole('jobseeker');
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Register as Job Seeker</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Textarea
            label="Skills (comma-separated)"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="UiPath, Python, SQL, Process Automation"
            rows={3}
          />

          <Textarea
            label="Career Goals"
            value={formData.careerGoals}
            onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
            placeholder="Describe your career objectives and what you're looking for..."
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resume Upload (Mock)
            </label>
            <div className="border-2 border-dashed border-dark-border rounded-md p-6 text-center">
              <FaUpload className="mx-auto text-3xl text-gray-500 mb-2" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer text-primary-blue hover:text-primary-blue/80"
              >
                {formData.resume || 'Click to upload resume'}
              </label>
              <p className="text-gray-500 text-sm mt-2">PDF, DOC, DOCX (Max 5MB)</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Register as Job Seeker
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

