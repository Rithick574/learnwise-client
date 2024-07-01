import { FC,useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Player } from "@lottiefiles/react-lottie-player";

export const PaymentSuccess:FC = () => {
    const navigate = useNavigate()


  useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
      <Player
            autoplay
            loop
            src="https://lottie.host/0a7ef40a-930f-4f2c-bf60-3f3eed1d087c/03xYNJilML.json"
            style={{ height: "400px", width: "400px" }}
          />
        <h1>Subscription Successful!</h1>
        <p>Redirecting to the homepage in 5 seconds...</p>
      </div>
    </div>
  );
};


