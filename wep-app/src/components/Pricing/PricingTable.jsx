import {PricingCard} from './PricingCard';
import {ToggleSwitch} from './ToggleSwitch';

export const PricingTable = ({ pricingData, isYearly, onToggle }) => {

    const getAdjustedPrice = (price) => {
        return isYearly ? (parseInt(price) * 10).toString() : price; // Multiplicamos por 10 para yearly, ajusta según necesites
      };
      
  return (
    <div className="pricing-table">
      <h1>Pick The Plan That Works for You</h1>
      <ToggleSwitch isYearly={isYearly} onToggle={onToggle} />
      <div className="cards-container">
        {pricingData.map((data, index) => (
          <PricingCard
            key={index}
            title={data.title}
            price={getAdjustedPrice(data.price)}
            features={data.features}
            isPopular={data.isPopular}
          />
        ))}
      </div>
    </div>
  );
};