import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { useProjectStore } from '../../store/projectStore';
import { useAuthStore } from '../../store/authStore';

export const RegisterProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjectStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    automationType: '',
    industry: '',
    timeline: '',
    budget: '',
    urgency: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      clientId: user?.id || '1',
      status: 'open',
    };
    
    addProject(projectData);
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Post a Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Invoice Processing Automation"
          />

          <Textarea
            label="Project Description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your automation requirements in detail..."
            rows={5}
          />

          <Select
            label="Automation Type"
            required
            value={formData.automationType}
            onChange={(e) => setFormData({ ...formData, automationType: e.target.value })}
          >
            <option value="">Select automation type</option>
            <option value="UiPath">UiPath</option>
            <option value="Automation Anywhere">Automation Anywhere</option>
            <option value="Blue Prism">Blue Prism</option>
            <option value="Power Automate">Power Automate</option>
            <option value="Custom">Custom Solution</option>
          </Select>

          <Select
            label="Industry"
            required
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          >
            <option value="">Select industry</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Government">Government</option>
            <option value="Other">Other</option>
          </Select>

          <Select
            label="Timeline"
            required
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          >
            <option value="">Select timeline</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3+ months">3+ months</option>
          </Select>

          <Input
            label="Budget"
            type="text"
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            placeholder="e.g., $5000 or $50/hour"
          />

          <Select
            label="Urgency Level"
            required
            value={formData.urgency}
            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
          >
            <option value="">Select urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </Select>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Post Project
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

