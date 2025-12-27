import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaBriefcase, FaGraduationCap, FaBuilding, FaArrowLeft } from 'react-icons/fa';
import { Container } from '../../components/layout/Container';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { addMockData } from '../../mock/data';

const missionTypes = [
  {
    id: 'freelancer',
    label: 'RPA Freelancer',
    description: 'Offer your RPA expertise to clients',
    icon: FaUsers,
    route: '/register/freelancer',
  },
  {
    id: 'jobseeker',
    label: 'Job Seeker',
    description: 'Find RPA job opportunities',
    icon: FaBriefcase,
    route: '/register/jobseeker',
  },
  {
    id: 'trainer',
    label: 'Trainer / Training Seeker',
    description: 'Learn or teach RPA skills',
    icon: FaGraduationCap,
    route: '/register/trainer',
  },
  {
    id: 'client',
    label: 'Employer / Client',
    description: 'Hire freelancers or post projects',
    icon: FaBuilding,
    route: '/register/client',
  },
];

export const Register = () => {
  const navigate = useNavigate();
  const { login, setRole } = useAuthStore();
  const [selectedMission, setSelectedMission] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleMissionSelect = (mission) => {
    setSelectedMission(mission);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMission) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: selectedMission.id,
    };
    
    const savedUser = addMockData('users', userData);
    login({ ...savedUser, role: selectedMission.id });
    setRole(selectedMission.id);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] mt-16 flex items-center justify-center bg-dark-bg bg-starfield py-12">
      <Container className="w-full max-w-4xl">
        {/* Return to Base Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white font-mono uppercase tracking-wider text-sm mb-8 hover:text-primary-blue transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          RETURN TO BASE
        </Link>

        {/* Access Terminal Card */}
        <div className="bg-dark-surface/80 backdrop-blur-sm border border-primary-blue/30 rounded-lg p-8 sm:p-10 shadow-[0_0_30px_rgba(77,166,255,0.1)]">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-white font-display uppercase tracking-tight mb-2">
              ACCESS TERMINAL
            </h1>
            <p className="text-white/80 font-mono uppercase tracking-[0.2em] text-sm">
              AUTHENTICATION REQUIRED
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Link
              to="/sign-in"
              className="flex-1 py-3 px-4 bg-dark-bg border border-primary-blue/20 text-gray-400 font-mono uppercase tracking-wider text-sm text-center hover:border-primary-blue/40 transition-colors"
            >
              SIGN IN
            </Link>
            <button
              className="flex-1 py-3 px-4 bg-dark-surface border-2 border-primary-blue text-white font-mono uppercase tracking-wider text-sm font-semibold"
            >
              REGISTER
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                  OPERATOR NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 font-mono tracking-wide focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="operator@mission.control"
                  className="w-full px-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 font-mono tracking-wide focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
              </div>

              <div>
                <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                  ACCESS CODE
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="........"
                  className="w-full px-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 font-mono tracking-wide focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Mission Type Selection */}
            <div>
              <h3 className="text-white font-mono uppercase tracking-wider text-sm mb-4">
                SELECT MISSION TYPE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missionTypes.map((mission) => {
                  const Icon = mission.icon;
                  const isSelected = selectedMission?.id === mission.id;
                  return (
                    <button
                      key={mission.id}
                      type="button"
                      onClick={() => handleMissionSelect(mission)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg transition-all ${
                        isSelected
                          ? 'border-primary-red bg-primary-red/10 shadow-[0_0_20px_rgba(255,51,51,0.3)]'
                          : 'border-primary-blue/20 bg-dark-bg hover:border-primary-blue/40'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isSelected ? 'text-primary-red' : 'text-primary-blue'}`}>
                        <Icon className="text-2xl" />
                      </div>
                      <div className="text-left flex-1">
                        <div className={`font-mono uppercase tracking-wider font-semibold mb-1 ${
                          isSelected ? 'text-white' : 'text-gray-300'
                        }`}>
                          {mission.label}
                        </div>
                        <div className={`text-xs font-mono ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                          {mission.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-mono uppercase tracking-wider text-lg py-4"
              disabled={!selectedMission}
            >
              CREATE ACCOUNT
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

