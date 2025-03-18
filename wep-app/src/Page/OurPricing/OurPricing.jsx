import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { Footer } from '../../components/Footer/Footer'
import {PricingTable} from '../../components/Pricing/PricingTable';
import {pricingData} from '../../components/Pricing/pricingData';
import '../../components/Pricing/Pricing.css'

export const OurPricing = () =>{

    const [isYearly, setIsYearly] = useState(false);

    const handleToggle = () => {
      setIsYearly(!isYearly);
    };

    return(
        <>
            <Header/>
            <PricingTable
                pricingData={pricingData}
                isYearly={isYearly}
                onToggle={handleToggle}
            />
            <Footer/>
        </>
    )
}