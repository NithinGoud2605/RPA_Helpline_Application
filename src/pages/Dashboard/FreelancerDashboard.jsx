import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FaDollarSign, FaEnvelope, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useState } from 'react';

export const FreelancerDashboard = () => {
  const [available, setAvailable] = useState(true);
  
  const activeBids = 5;
  const unreadMessages = 3;
  const earnings = 12500;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Bids</p>
              <p className="text-3xl font-bold text-white">{activeBids}</p>
            </div>
            <FaDollarSign className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Messages</p>
              <p className="text-3xl font-bold text-white">{unreadMessages}</p>
              {unreadMessages > 0 && (
                <Badge variant="danger" size="sm" className="mt-1">New</Badge>
              )}
            </div>
            <FaEnvelope className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-white">${earnings.toLocaleString()}</p>
            </div>
            <FaDollarSign className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Availability</p>
              <button
                onClick={() => setAvailable(!available)}
                className="flex items-center gap-2 mt-2"
              >
                {available ? (
                  <>
                    <FaToggleOn className="text-3xl text-green-500" />
                    <span className="text-green-400 font-semibold">Available</span>
                  </>
                ) : (
                  <>
                    <FaToggleOff className="text-3xl text-gray-500" />
                    <span className="text-gray-400 font-semibold">Unavailable</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Bids</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="text-white font-semibold">Invoice Processing Automation</h3>
                <p className="text-gray-400 text-sm">Bid: $75/hour • 2 days ago</p>
              </div>
              <Badge variant="info">Pending</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

