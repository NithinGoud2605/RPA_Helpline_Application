import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { addMockData } from '../../mock/data';

export const RegisterDeveloper = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    techStack: [],
    certifications: '',
    industryExperience: [],
  });

  const [selectedTech, setSelectedTech] = useState('');
  const techOptions = ['UiPath', 'Automation Anywhere', 'Blue Prism', 'Python', 'C#', 'Power Automate', 'Selenium'];
  
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const industries = ['Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Telecommunications', 'Government'];

  const handleAddTech = () => {
    if (selectedTech && !formData.techStack.includes(selectedTech)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, selectedTech],
      });
      setSelectedTech('');
    }
  };

  const handleAddIndustry = () => {
    if (selectedIndustry && !formData.industryExperience.includes(selectedIndustry)) {
      setFormData({
        ...formData,
        industryExperience: [...formData.industryExperience, selectedIndustry],
      });
      setSelectedIndustry('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const developerData = {
      name: formData.name,
      email: formData.email,
      techStack: formData.techStack,
      certifications: formData.certifications.split(',').map(c => c.trim()),
      industryExperience: formData.industryExperience,
      rating: 0,
      missionsCompleted: 0,
    };
    
    addMockData('developers', developerData);
    login({ email: formData.email, role: 'developer', name: formData.name });
    setRole('developer');
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Register as RPA Developer</h1>
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <Select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="flex-1"
              >
                <option value="">Select technology</option>
                {techOptions.map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </Select>
              <Button type="button" onClick={handleAddTech}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-blue/20 text-primary-blue border border-primary-blue/30 rounded-md text-sm"
                >
                  {tech} ×
                </span>
              ))}
            </div>
          </div>

          <Textarea
            label="Certifications (comma-separated)"
            value={formData.certifications}
            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
            placeholder="UiPath Advanced RPA Developer, Blue Prism Certified Developer"
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Industry Experience</label>
            <div className="flex gap-2 mb-2">
              <Select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="flex-1"
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </Select>
              <Button type="button" onClick={handleAddIndustry}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.industryExperience.map((industry) => (
                <span
                  key={industry}
                  className="px-3 py-1 bg-primary-blue/20 text-primary-blue border border-primary-blue/30 rounded-md text-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Register as Developer
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

