import {withRouter} from 'react-router-dom';
import { CardElement } from '@stripe/react-stripe-js';

const Stripe = () => {
    return <CardElement/>
}

export default withRouter(Stripe)