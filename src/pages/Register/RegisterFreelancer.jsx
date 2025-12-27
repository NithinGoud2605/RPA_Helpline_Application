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

export const RegisterFreelancer = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [],
    experience: '',
    availability: '',
    hourlyRate: '',
    portfolio: '',
  });

  const [selectedSkill, setSelectedSkill] = useState('');
  const skills = ['UiPath', 'Automation Anywhere', 'Blue Prism', 'Python', 'Power Automate'];

  const handleAddSkill = () => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, selectedSkill],
      });
      setSelectedSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const freelancerData = {
      userId: Math.random().toString(36).substr(2, 9),
      ...formData,
      hourlyRate: parseFloat(formData.hourlyRate),
      rating: 0,
    };
    
    addMockData('freelancers', freelancerData);
    login({ email: formData.email, role: 'freelancer', name: formData.name });
    setRole('freelancer');
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Register as Freelancer</h1>
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
            <div className="flex gap-2 mb-2">
              <Select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="flex-1"
              >
                <option value="">Select a skill</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </Select>
              <Button type="button" onClick={handleAddSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary-blue/20 text-primary-blue border border-primary-blue/30 rounded-md text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-primary-red"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Select
            label="Experience Level"
            required
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          >
            <option value="">Select experience level</option>
            <option value="Junior">Junior (0-2 years)</option>
            <option value="Mid">Mid-level (2-5 years)</option>
            <option value="Senior">Senior (5+ years)</option>
          </Select>

          <Select
            label="Availability"
            required
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          >
            <option value="">Select availability</option>
            <option value="Available">Available</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Limited">Limited</option>
          </Select>

          <Input
            label="Hourly Rate (USD)"
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
            placeholder="$0.00"
          />

          <Input
            label="Portfolio URL"
            type="url"
            value={formData.portfolio}
            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
            placeholder="https://your-portfolio.com"
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Register as Freelancer
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

