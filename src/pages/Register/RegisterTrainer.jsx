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

export const RegisterTrainer = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coursesOffered: [],
    yearsExperience: '',
    pricing: '',
  });

  const [newCourse, setNewCourse] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim() && !formData.coursesOffered.includes(newCourse.trim())) {
      setFormData({
        ...formData,
        coursesOffered: [...formData.coursesOffered, newCourse.trim()],
      });
      setNewCourse('');
    }
  };

  const handleRemoveCourse = (course) => {
    setFormData({
      ...formData,
      coursesOffered: formData.coursesOffered.filter((c) => c !== course),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trainerData = {
      name: formData.name,
      email: formData.email,
      coursesOffered: formData.coursesOffered,
      yearsExperience: parseInt(formData.yearsExperience),
      pricing: formData.pricing,
      rating: 0,
    };
    
    addMockData('trainers', trainerData);
    login({ email: formData.email, role: 'trainer', name: formData.name });
    setRole('trainer');
    navigate('/dashboard');
  };

  return (
    <Container className="py-12">
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Register as Trainer</h1>
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Courses Offered</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Enter course name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCourse())}
              />
              <Button type="button" onClick={handleAddCourse}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.coursesOffered.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-primary-blue/20 text-primary-blue border border-primary-blue/30 rounded-md text-sm flex items-center gap-2"
                >
                  {course}
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(course)}
                    className="hover:text-primary-red"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Input
            label="Years of Experience"
            type="number"
            required
            min="0"
            value={formData.yearsExperience}
            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
          />

          <Input
            label="Pricing"
            required
            value={formData.pricing}
            onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
            placeholder="$150/hour or $5000/course"
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Register as Trainer
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

