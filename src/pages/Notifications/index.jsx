import { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { notificationApi } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../hooks/useToast';
import { useNotifications } from '../../contexts/NotificationContext';
import { Container } from '../../components/layout/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  ArrowLeft, Bell, Briefcase, MessageSquare, Eye, Star, CheckCircle,
  AlertCircle, Calendar, DollarSign, User, Trash2, CheckCheck, Filter
} from 'lucide-react';

// ============================================================================
// NOTIFICATION ICON MAP
// ============================================================================
const getNotificationConfig = (type) => {
  const configs = {
    // Applications
    new_application: { icon: User, color: 'bg-green-500/10 text-green-500' },
    application_viewed: { icon: Eye, color: 'bg-blue-500/10 text-blue-500' },
    application_shortlisted: { icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-500' },
    application_accepted: { icon: CheckCircle, color: 'bg-accent/10 text-accent' },
    application_rejected: { icon: AlertCircle, color: 'bg-red-500/10 text-red-500' },
    application_status: { icon: CheckCircle, color: 'bg-accent/10 text-accent' },

    // Projects & jobs
    project_posted: { icon: Briefcase, color: 'bg-primary/10 text-primary' },
    project_updated: { icon: Briefcase, color: 'bg-blue-500/10 text-blue-500' },
    project_completed: { icon: CheckCircle, color: 'bg-emerald-500/10 text-emerald-500' },
    job_posted: { icon: Briefcase, color: 'bg-secondary/10 text-secondary' },
    job_closed: { icon: AlertCircle, color: 'bg-orange-500/10 text-orange-500' },

    // Messages
    new_message: { icon: MessageSquare, color: 'bg-purple-500/10 text-purple-500' },

    // Reviews
    new_review: { icon: Star, color: 'bg-yellow-500/10 text-yellow-500' },

    // Payments
    payment_received: { icon: DollarSign, color: 'bg-green-500/10 text-green-500' },
    invoice_sent: { icon: DollarSign, color: 'bg-amber-500/10 text-amber-500' },

    // System
    profile_verified: { icon: CheckCircle, color: 'bg-cyan-500/10 text-cyan-500' },
    system_announcement: { icon: Bell, color: 'bg-muted text-muted-foreground' },
  };
  return configs[type] || { icon: Bell, color: 'bg-muted text-muted-foreground' };
};

// ============================================================================
// NOTIFICATION ITEM COMPONENT
// ============================================================================
const NotificationItem = memo(({ notification, onMarkRead, onDelete }) => {
  const navigate = useNavigate();
  const config = getNotificationConfig(notification.notification_type);
  const Icon = config.icon;

  const handleClick = () => {
    if (!notification.is_read) {
      onMarkRead(notification.id);
    }
    if (notification.action_url) {
      navigate(notification.action_url);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-border/50 cursor-pointer transition-all hover:bg-card group ${!notification.is_read ? 'bg-primary/5' : ''
        }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {notification.title && (
                <h4 className="font-display font-bold text-foreground text-sm mb-1">
                  {notification.title}
                </h4>
              )}
              <p className={`text-sm ${notification.is_read ? 'text-muted-foreground' : 'text-foreground'}`}>
                {notification.message || notification.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {notification.created_at
                  ? new Date(notification.created_at).toLocaleString()
                  : ''}
              </p>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notification.is_read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead(notification.id);
                  }}
                  className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Mark as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!notification.is_read && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
});
NotificationItem.displayName = 'NotificationItem';

// ============================================================================
// MAIN NOTIFICATIONS PAGE
// ============================================================================
export const Notifications = memo(() => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const toast = useToast();
  const { decrementNotificationCount, clearNotificationCount, refresh: refreshNotifications } = useNotifications();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await notificationApi.getAll({ limit: 100 });
        setNotifications(response.notifications || []);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const handleMarkRead = useCallback(async (id) => {
    // Find the notification to check if it's unread
    const notification = notifications.find(n => n.id === id);
    const wasUnread = notification && !notification.is_read;

    try {
      await notificationApi.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
      // Update navbar badge immediately
      if (wasUnread) {
        decrementNotificationCount();
      }
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  }, [toast, notifications, decrementNotificationCount]);

  const handleDelete = useCallback(async (id) => {
    // Find the notification to check if it's unread
    const notification = notifications.find(n => n.id === id);
    const wasUnread = notification && !notification.is_read;

    try {
      await notificationApi.delete(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      // Update navbar badge if we deleted an unread notification
      if (wasUnread) {
        decrementNotificationCount();
      }
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  }, [toast, notifications, decrementNotificationCount]);

  const handleMarkAllRead = useCallback(async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      // Clear navbar badge immediately
      clearNotificationCount();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  }, [toast, clearNotificationCount]);

  const handleDeleteAllRead = useCallback(async () => {
    try {
      await notificationApi.deleteAllRead();
      setNotifications(prev => prev.filter(n => !n.is_read));
      // Refresh counts to stay in sync
      refreshNotifications();
      toast.success('Read notifications deleted');
    } catch (error) {
      toast.error('Failed to delete read notifications');
    }
  }, [toast, refreshNotifications]);

  // Filter notifications
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.is_read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Container className="py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-foreground font-mono uppercase tracking-wider text-xs mb-4 hover:text-secondary transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          BACK TO DASHBOARD
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-wider">
                NOTIFICATIONS
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllRead}
                className="font-mono text-xs"
              >
                <CheckCheck className="w-4 h-4 mr-1" />
                MARK ALL READ
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all ${filter === 'all'
              ? 'bg-primary text-white'
              : 'tech-panel text-muted-foreground hover:text-foreground'
              }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all ${filter === 'unread'
              ? 'bg-primary text-white'
              : 'tech-panel text-muted-foreground hover:text-foreground'
              }`}
          >
            Unread ({unreadCount})
          </button>

          {notifications.some(n => n.is_read) && (
            <button
              onClick={handleDeleteAllRead}
              className="ml-auto text-sm text-muted-foreground hover:text-red-500 transition-colors font-mono"
            >
              <Trash2 className="w-4 h-4 inline mr-1" />
              Clear read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <Card className="tech-panel border-border bg-card/50 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="divide-y divide-border/50">
              {filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                No Notifications
              </h3>
              <p className="text-muted-foreground">
                {filter === 'unread'
                  ? "You're all caught up!"
                  : "You don't have any notifications yet."}
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </Container>
  );
});

Notifications.displayName = 'Notifications';



