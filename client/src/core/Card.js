import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : 'A photo from pexels';
  const cartDescrption = product ? product.description : 'Default description';
  const cartPrice = product ? product.price : 'DEFAULT';

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-warning"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card rounded ">
      {getARedirect(redirect)}
      <div class="card-image">
          <span class="card-notify-badge">New</span>
          <ImageHelper product={product} />
      </div>
      <div class=" m-auto"> <h5>{cartTitle}</h5> </div>
      <p class="font-weight-bold">₹ {cartPrice}</p>
      <div class="text-center mb-4"> {showAddToCart(addtoCart)}{showRemoveFromCart(removeFromCart)}</div>
    </div>
  );
};

export default Card;
