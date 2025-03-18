
export const PricingCard = ({ title, price, features, isPopular = false }) => {
  return (
    <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
      <h2>{title}</h2>
      <p className="price">${price} USD</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="buy-button">
        {isPopular ? (
          <>Buy Package <span>→</span></>
        ) : (
          <span className="custom-arrow"></span>
        )}
      </button>
    </div>
  );
};