import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import io, { Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    if (user && user._id) {
      const newSocket = io('https://phonebazaar.shop/api/payment', {
        query: { userId: user._id },
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        console.log('Connected to server🌐🌐🌐');
        setSocket(newSocket);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setSocket(null);
      });

      newSocket.on('getOnlineUsers', (users: any[]) => {
        setOnlineUsers(users);
      });

      newSocket.on('incomingCall', (data) => {
        console.log('Incoming call:', data);
        toast((t) => (
          <div className="bg-green-100 p-4 rounded-md">
            <p className="font-medium">Incoming call</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => {
                  window.location.href = data.data.link;
                  toast.dismiss(t.id);
                }}
              >
                Join
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => toast.dismiss(t.id)}
              >
                Decline
              </button>
            </div>
          </div>
        ), {
          duration: 20000,
          position: 'top-right',
        });
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  const value = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
