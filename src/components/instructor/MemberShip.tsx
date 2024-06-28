import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { RootState } from '@/redux/store';
import { URL } from '@/Common/api';

const stripePromise = loadStripe('pk_test_51PMSNzP4PKhJTaDCuHBaA4GXhueUVNp0yA05gvo0DdJu2tf1jCDkXdM5NQYMicYibgyZYxGwlOiZxItIMemHR2Ir00DNytgr8J');

interface MemberShipProps {
  instructorId: { email: string };
}

const MemberShip: FC<MemberShipProps> = ({ instructorId }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      checkMembership();
    }
  }, [user]);

  const checkMembership = async () => {
    try {
      const response = await axios.get(`${URL}/payment/subscription/${user?.email}/${instructorId.email}`);
      setHasMembership(response.data.success);
    } catch (error) {
      console.error('Error checking membership:', error);
    }
  };

  const handleSubscribe = async () => {
    setProcessingTo(true);

    try {
      const postData = {
        email,
        instructorId: instructorId.email,
      };
      const response = await axios.post(`${URL}/payment/subscription/create-subscription-checkout-session`, postData);
      // localStorage.setItem('MemberShipData', JSON.stringify({ customerId: email, instructorId: instructorId.email }));

      const stripe = await stripePromise;
      const { id: sessionId } = response.data;

      const result = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error('Error:', result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessingTo(false);
    }
  };

  return (
    <>
      {hasMembership ? (
        <p className="text-green-500">You already have a membership for this instructor.</p>
      ) : (
        <div className="flex flex-col items-center h-screen border rounded-lg p-2">
          <h1 className="text-3xl font-bold mb-4">Take Membership with Instructor</h1>
          <div className="mt-2 px-6 pb-4">
            <p className="text-gray-400">
              By subscribing to the membership, you gain exclusive access to interact with the instructor through chat and video calls. 
              This allows you to receive personalized guidance and support, ensuring you get the most out of your learning experience. 
              Additionally, you'll have priority support to keep you engaged and informed.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <div className="flex flex-col items-center border p-4 rounded-lg m-2 w-full md:w-3/8">
              <h2 className="text-xl font-bold mb-2">Free</h2>
              <p className="text-4xl font-bold">₹0<span className="text-base">/month</span></p>
              <ul className="list-disc list-inside text-left mt-4 space-y-2">
                <li>10 Credits</li>
                <li>Generate video (2 credits)</li>
                <li>Quiz (1 credit)</li>
              </ul>
              <button className="mt-4 px-4 py-2 rounded-md bg-gray-800 text-gray-500 cursor-not-allowed" disabled>
                Continue with Free
              </button>
            </div>
            <div className="flex flex-col items-center border p-4 rounded-lg m-2 w-full md:w-5/8">
              <h2 className="text-xl font-bold mb-2">Pro</h2>
              <p className="text-4xl font-bold">₹199<span className="text-base">/month</span></p>
              <ul className="list-disc list-inside text-left mt-4 space-y-2">
                <li>30 credits</li>
                <li>AI MockInterviews</li>
                <li>Generate video (2 credits)</li>
                <li>Analytics on the quiz</li>
              </ul>
              <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className={`mt-4 px-4 py-2 rounded-md ${
                  isProcessing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Subscribe To Pro'}
              </button>
            </div>
          </div>
          <p className="text-gray-500">
            You will be redirected to Stripe to complete the subscription process.
          </p>
        </div>
      )}
    </>
  );
};

export default MemberShip;
