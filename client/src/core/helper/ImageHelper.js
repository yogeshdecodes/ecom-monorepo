import React, { useState, useEffect } from 'react';
import { getImage } from './coreapicalls';

export const ImageHelper = ({ product }) => {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  const loadImage = () => {
    getImage(product).then((data) => {
      if (data.error) {
        setImage(
          'https://wikiclipart.com/wp-content/uploads/2017/06/Sweatshirt-tee-shirt-clipart.png'
        );
        setError(data.error);
      } else {
        data = new Buffer.from(data.data).toString('base64');
        setImage('data:image/png;base64,' + data);

        // alternatively method for binary image to base64
        // let TYPED_ARRAY = new Uint8Array(data.data);
        // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        //   return data + String.fromCharCode(byte);
        // }, '');
        // let base64String = btoa(STRING_CHAR);
        // setImage('data:image/jpg;base64,' + base64String);
      }
    });
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className="rounded border border-success p-2">
      <img
        src={image}
        alt="card ui"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
