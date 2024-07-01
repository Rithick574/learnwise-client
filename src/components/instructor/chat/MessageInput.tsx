import { FC, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useSocket } from '@/contexts/SocketContext';
import { PaperClipIcon, XCircleIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { PiPaperPlaneRight } from 'react-icons/pi';
import { ReactMic, ReactMicStopEvent } from 'react-mic';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { BiHappyHeartEyes } from 'react-icons/bi';
import { RootState } from '@/redux/store';
import videoUpload from '@lib/utility/videoUploadCloudinay';
import ImageUpdload from '@lib/utility/ImageUpload';
import { URL } from '@/Common/api';
import { AudioUpload } from '@lib/utility/AudioUpload';

interface MessageInputProps {
  chatId: string;
  recieversId: string;
  onMessageSent: (newMessage: any) => void;
}

const MessageInput: FC<MessageInputProps> = ({ chatId, recieversId, onMessageSent }) => {
  const [message, setMessage] = useState('');
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const [typing, setTyping] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [_selectedEmoji, setSelectedEmoji] = useState('');
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('joinRoom', chatId);
    }
  }, [socket, chatId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typing && socket) {
        socket.emit('stopTyping', { roomId: chatId, sender: user._id });
        setTyping(false);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [message, typing, chatId, socket, user._id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!typing && socket) {
      setTyping(true);
      socket.emit('typing', { roomId: chatId, sender: user._id });
    }
  };

  const handleFileUpload = async (event: React.MouseEvent) => {
    try {
      event.stopPropagation();
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.jpg, .jpeg, .png, .mp4, .avi, .mov';
      input.click();

      input.addEventListener('change', async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          toast.error('No file selected');
          return;
        }

        if (file.size > 15 * 1024 * 1024) {
          toast.error('File size exceeds 15MB limit');
          return;
        }

        setFileUploading(true);

        let type: string;
        if (file.type.startsWith('image/')) {
          type = 'image';
        } else if (file.type.startsWith('video/')) {
          type = 'video';
        } else {
          toast.error('Please upload a valid image or video file');
          setFileUploading(false);
          return;
        }

        try {
          let url: string | null = null;
          if (type === 'image') {
            url = await ImageUpdload(file);
          } else if (type === 'video') {
            url = await videoUpload(file, (progress) => {
              console.log(`Upload Progress: ${progress}%`);
            });
          } else {
            toast.error('Image and Video only support');
          }
          if (url) {
            setFileUrl(url);
            setMessage(url);
            setFileType(type);
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
          } else {
            toast.error('Failed to upload file. Please try again.');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file. Please try again.');
        } finally {
          setFileUploading(false);
        }
      });
    } catch (error) {
      console.error('Error in file upload:', error);
      toast.error('An error occurred during file upload');
      setFileUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !fileUrl) {
      toast.error('Message cannot be empty');
      return;
    }
    console.log("🚀 ~ file: MessageInput.tsx:128 ~ handleSendMessage ~ fileUrl:", fileUrl)
    console.log("🚀 ~ file: MessageInput.tsx:128 ~ handleSendMessage ~ message:", message)
    console.log("🚀 ~ file: MessageInput.tsx:145 ~ handleSendMessage ~ data.fileType:",fileType)

    try {
      const data = {
        sender: user.firstName,
        reciever: recieversId,
        content: message,
        senderId: user._id,
        chatId: chatId,
        contentType: fileType || 'text',
        time: new Date().toLocaleTimeString(),
        seen: 0,
      };

      if (socket) {
        socket.emit('newMessage', { obj: data });
      } else {
        console.error('Socket not connected yet, cannot emit message.');
      }

      const messageData = {
        sender: user._id,
        reciever: recieversId,
        content: message,
        contentType: fileType,
      };

      const res = await axios.post(`${URL}/chat/message`, {
        messageData,
        chatData: chatId,
      });
      console.log("🚀 ~ file: MessageInput.tsx:162 ~ handleSendMessage ~ res:", res)

      const newMessage = {
        id: res.data.data._id,
        sender: user.firstName,
        senderId: user._id,
        content: res.data.data.content,
        time: new Date(res.data.data.createdAt).toLocaleTimeString(),
        seen: 0,
        contentType: fileType,
      };
      onMessageSent(newMessage);
      setMessage('');
      setFileUrl(null);
      setFileType('text');
      if(socket){
        socket.emit('stopTyping', { roomId: chatId, sender: user._id });
      }
      setTyping(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const handleRemoveFile = () => {
    setFileUrl(null);
    setFileType('text');
    setMessage('');
  };

  const handleEmojiClick = (event: EmojiClickData) => {
    const emoji = event.emoji;
    setSelectedEmoji(emoji);
    setMessage(prevMessage => prevMessage + emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onStop = async (recordedBlob: ReactMicStopEvent) => {
    setFileUploading(true);
    try {
      const file = new File([recordedBlob.blob], 'audio.webm', { type: 'audio/webm' });
      const audioUrl = await AudioUpload(file);
      console.log("🚀 ~ file: MessageInput.tsx:217 ~ audioUrl ~ audioUrl:", audioUrl)
      setFileUrl(audioUrl);
      setFileType('audio');
      setMessage(audioUrl);
      toast.success('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio. Please try again.');
    } finally {
      setFileUploading(false);
    }
  };

  return (
    <div className="p-2 shadow-inner absolute bottom-0 w-[58%]">
      {fileUrl && (
        <div className="mb-2 relative">
          {fileType === 'image' ? (
            <img src={fileUrl} alt="Attached image" className="max-h-40 rounded" />
          ) : fileType === 'video' ? (
            <video src={fileUrl} controls className="max-h-40 rounded">
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio src={fileUrl} controls className="w-full">
              Your browser does not support the audio element.
            </audio>
          )}
          <XCircleIcon
            className="w-6 h-6 absolute top-1 right-1 cursor-pointer text-red-500"
            onClick={handleRemoveFile}
          />
        </div>
      )}
        {fileUploading && <span className="">Uploading...</span>}
      <div className="flex items-center relative">
        <PaperClipIcon className="w-8 ms-2 cursor-pointer absolute text-gray-400" onClick={handleFileUpload} />
        <BiHappyHeartEyes className="text-3xl cursor-pointer absolute ms-10 text-gray-400" onClick={toggleEmojiPicker} />
        <input
          type="text"
          placeholder="Your message"
          className="input input-bordered flex-1 pl-20 pr-24"
          value={fileType === 'text' ? message : ''}
          onChange={handleInputChange}
        />
        <button
          className="btn m-2 bg-gray-600 text-white"
          onClick={handleSendMessage}
          disabled={fileUploading}
        >
          <PiPaperPlaneRight />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full -0 mb-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <div className="absolute right-24 flex items-center">
          {recording ? (
            <XMarkIcon
              className="w-8 h-8 text-red-500 cursor-pointer"
              onClick={stopRecording}
            />
          ) : (
            <MicrophoneIcon
              className="w-8 h-8 text-gray-400 cursor-pointer"
              onClick={startRecording}
            />
          )}
        </div>
      </div>
      <ReactMic
        record={recording}
        className="hidden"
        onStop={onStop}
        mimeType="audio/webm"
      />
    </div>
  );
};

export default MessageInput;
