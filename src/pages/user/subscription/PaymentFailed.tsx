import { FC,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed:FC = () => {
  const history = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      history('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>Payment Failed</h1>
      <p>Something went wrong with your payment. Redirecting to the homepage in 5 seconds...</p>
    </div>
  );
};

export default PaymentFailed;
