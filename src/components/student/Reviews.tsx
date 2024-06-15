import { useState, useEffect, FC, ChangeEvent, FormEvent } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { format } from 'date-fns';
import { URL } from '@/Common/api';
import toast from 'react-hot-toast';

interface Review {
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    profile: {
      avatar?: string;
    };
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  _id?: string;
  courseId?: string;
}

interface ReviewsProps {
  courseId: string | undefined;
  userId: string;
  enrolled: boolean;
}

export const Reviews: FC<ReviewsProps> = ({ courseId, userId, enrolled }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<{ rating: number; comment: string }>({
    rating: 0,
    comment: ''
  });
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ data: Review[] }>(`${URL}/course/review/${courseId}`);
        const reviewsData = response.data.data;
        setReviews(reviewsData);

        const userReview = reviewsData.find(review => review.userId._id === userId);
        if (userReview) {
          setHasReviewed(true);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, userId]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        if(!newReview.rating) return toast.error("please give atleast 1 star")
        
      const response = await axios.post<{ data: Review }>(`${URL}/course/review`, {
        courseId,
        userId,
        ...newReview
    });
      setReviews(prev => [...prev, response.data.data]);
      setNewReview({
        rating: 0,
        comment: ''
      });
      setHasReviewed(true);
    } catch (error) {
      console.error('Error posting review:', error);
      setError('Failed to post review.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++;
  });

  return (
    <div className='mt-8'>
      <h1 className='text-2xl font-bold'>Reviews About This Course</h1>
      <div className='flex items-center mt-4'>
        <h1 className='text-4xl font-bold'>{averageRating.toFixed(1)}</h1>
        <div className='flex ml-4'>
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < Math.round(averageRating) ? (
                <AiFillStar className='text-yellow-500' />
              ) : (
                <AiOutlineStar className='text-yellow-500' />
              )}
            </span>
          ))}
        </div>
        <p className='ml-2'>(Based on {reviews.length} reviews)</p>
      </div>

      {/* Rating distribution */}
      <div className='mt-4'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='flex items-center mb-1'>
            <div className='flex-1 h-2 mx-2 bg-gray-200 rounded'>
              <div
                className='h-2 bg-yellow-500 rounded'
                style={{
                  width: `${(ratingDistribution[4 - i] / reviews.length) * 100}%`
                }}
              ></div>
            </div>
            <span className='w-6 text-center'>{ratingDistribution[4 - i]}</span>
            <div className='flex ml-2'>
              {[...Array(5)].map((_, j) => (
                <span key={j}>
                  {j < 5 - i ? (
                    <AiFillStar className='text-yellow-500' />
                  ) : (
                    <AiOutlineStar className='text-yellow-500' />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4'>
        {reviews.map((review, index) => (
          <div key={index} className='mb-4'>
            <div className='flex items-center'>
              <img
                className='rounded-full w-14 h-14 object-cover'
                src={review.userId.profile?.avatar || 'https://via.placeholder.com/150'}
                alt='Profile'
              />
              <div className='ml-4'>
                <h2 className='text-xl font-semibold'>{`${review.userId.firstName} ${review.userId.lastName}`}</h2>
                <p className='text-gray-500'>{format(new Date(review.createdAt), 'MMM dd, yyyy')}</p>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? (
                        <AiFillStar className='text-yellow-500' />
                      ) : (
                        <AiOutlineStar className='text-yellow-500' />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className='mt-2'>{review.comment}</p>
          </div>
        ))}
      </div>

      {enrolled && !hasReviewed && (
        <>
          <h2 className='text-2xl font-bold mt-6'>Leave a Review</h2>
          <form onSubmit={handleSubmit} className='mt-4'>
            <div className='flex items-center mt-4 border p-2'>
              <label className='mr-2'>Rating:</label>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} onClick={() => handleRatingChange(i + 1)}>
                    {i < newReview.rating ? (
                      <AiFillStar className='text-yellow-500 cursor-pointer' />
                    ) : (
                      <AiOutlineStar className='text-yellow-500 cursor-pointer' />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <textarea
              name='comment'
              value={newReview.comment}
              onChange={handleInputChange}
              placeholder='Your review'
              className='border p-2 rounded-lg w-full mt-4 bg-gray-900'
              rows={4}
              required
            ></textarea>
            <button type='submit' className='mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg'>
              Post Review
            </button>
          </form>
        </>
      )}
    </div>
  );
};
