import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FaChalkboardTeacher, FaCalendar, FaStar } from 'react-icons/fa';

export const TrainerDashboard = () => {
  const courseRequests = 8;
  const upcomingSessions = 5;
  const rating = 4.9;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Course Requests</p>
              <p className="text-3xl font-bold text-white">{courseRequests}</p>
            </div>
            <FaChalkboardTeacher className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Upcoming Sessions</p>
              <p className="text-3xl font-bold text-white">{upcomingSessions}</p>
            </div>
            <FaCalendar className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-white">{rating}</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}
                    size={12}
                  />
                ))}
              </div>
            </div>
            <FaStar className="text-4xl text-yellow-400 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Course Requests */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Course Requests</h2>
        <div className="space-y-4">
          {[
            { name: 'UiPath Foundation', student: 'John Doe', date: '2024-01-15', status: 'pending' },
            { name: 'Advanced RPA Development', student: 'Jane Smith', date: '2024-01-20', status: 'confirmed' },
            { name: 'RPA Architecture', student: 'Bob Johnson', date: '2024-01-25', status: 'pending' },
          ].map((request, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="text-white font-semibold">{request.name}</h3>
                <p className="text-gray-400 text-sm">{request.student} • {request.date}</p>
              </div>
              <Badge variant={request.status === 'confirmed' ? 'success' : 'warning'}>
                {request.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Student Reviews */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Reviews</h2>
        <div className="space-y-4">
          {[
            { student: 'Alice Brown', course: 'UiPath Foundation', rating: 5, comment: 'Excellent course, very comprehensive!' },
            { student: 'Charlie Wilson', course: 'Advanced RPA', rating: 5, comment: 'Great instructor, learned a lot.' },
          ].map((review, index) => (
            <div key={index} className="p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{review.student}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={star <= review.rating ? 'text-yellow-400' : 'text-gray-600'}
                      size={14}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{review.course}</p>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

