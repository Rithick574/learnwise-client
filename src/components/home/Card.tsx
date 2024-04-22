interface CardProps {
  title: string;
  description: string;
  image:string
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="card flex  ml-2 mr-2 shadow-lg flex-col items-center  justify-center">
      <img src={image} className="mb-4" alt={title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      <h3 className="text-center text-xl font-medium">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
};


export default Card;
