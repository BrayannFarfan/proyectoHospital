import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import DoctorDetail from '../../components/DoctorDetail/DoctorDetail';

export const Detail = () => {
    return (
        <div>
            <Header />
            <DoctorDetail/>
            <Footer />
        </div>
    );
};