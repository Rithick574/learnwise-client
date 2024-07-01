import { useSocket } from "@/contexts/SocketContext";
import { FC, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number): string {
  let result = '';
  if (result) return result;
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url: string = window.location.href): URLSearchParams {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const VideoCall: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const senderId = queryParams.get('senderId');
  const socket = useSocket();
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const meetingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meetingContainerRef.current) {
      myMeeting(meetingContainerRef.current);
    }

    async function myMeeting(element: HTMLDivElement) {
      const appID = Number(import.meta.env.VITE_REACT_APP_APPID);
      const serverSecret = import.meta.env.VITE_REACT_APP_SERVERSECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });

      const data = {
        id: id,
        senderId: senderId,
        link: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
      };

      socket?.emit("videoCall", data);
    }
  }, [roomID, socket, id, senderId]);

  return (
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default VideoCall;
