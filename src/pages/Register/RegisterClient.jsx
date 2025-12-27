import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { addMockData } from '../../mock/data';

export const RegisterClient = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      role: 'client',
    };
    
    const userData = addMockData('users', clientData);
    login({ ...userData, role: 'client' });
    setRole('client');
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Register as Client</h1>
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

          <Input
            label="Company Name"
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Register as Client
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

