import { CardInstrument } from '@bigcommerce/checkout-sdk';
import { useState } from 'react';

import { useCheckout, usePaymentFormContext } from '@bigcommerce/checkout/payment-integration-api';
import { isPayPalConnectAcceleratedCheckoutCustomer } from '@bigcommerce/checkout/paypal-connect-integration';

export const usePayPalCommerceAcceleratedCheckoutInstruments = () => {
    const [selectedInstrument, setSelectedInstrument] = useState<CardInstrument>();

    const { getPaymentProviderCustomer } = useCheckout().checkoutState.data;
    const paymentProviderCustomer = getPaymentProviderCustomer();
    const paypalConnectPaymentProviderCustomer = isPayPalConnectAcceleratedCheckoutCustomer(
        paymentProviderCustomer,
    )
        ? paymentProviderCustomer
        : {};

    const { paymentForm } = usePaymentFormContext();

    const handleSelectInstrument = (instrument: CardInstrument): void => {
        setSelectedInstrument(instrument);
        paymentForm.setFieldValue('instrumentId', instrument.bigpayToken);
    };

    return {
        instruments: paypalConnectPaymentProviderCustomer.instruments || [],
        handleSelectInstrument,
        selectedInstrument,
    };
};
