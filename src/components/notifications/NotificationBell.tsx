import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order':
      return '📦';
    case 'payment':
      return '💳';
    case 'message':
      return '💬';
    case 'system':
      return '⚙️';
    default:
      return '📢';
  }
};

export const NotificationBell = () => {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-secondary"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-96">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-4 border-b transition-colors hover:bg-muted/50",
                  !notification.is_read && "bg-primary/5"
                )}
              >
                <div className="text-xl flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={cn(
                      "text-sm font-medium leading-tight",
                      !notification.is_read && "font-semibold"
                    )}>
                      {notification.title}
                    </h4>
                    {!notification.is_read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 flex-shrink-0"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(notification.created_at)}
                    </span>
                    {!notification.is_read && (
                      <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};