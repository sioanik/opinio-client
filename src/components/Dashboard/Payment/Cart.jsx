
const Cart = () => {
    const packagePrice = 100
    return (
        <div>
            <p>Gold Package- <span>{packagePrice}</span></p>
            <button className="btn btn-neutral">Pay now!</button>
        </div>
    );
};

export default Cart;