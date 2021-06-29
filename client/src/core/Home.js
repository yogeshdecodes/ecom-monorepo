import React, { useState, useEffect } from 'react';
import '../styles.css';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data?.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="col text-center">
        <h1 className="text-dark">All of tshirts</h1>
      </div>
      <div className="row">
        {products?.length ? (
          products.map((product, index) => {
            return (
              <div key={index} className="col-md-4">
                <Card product={product} />
              </div>
            );
          })
        ) : (
          <div className="container mt-5 mb-5">
            <div className="row">
              <div className="col-md-4">
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-picture"></div>
                    <div class="ph-row">
                      <div class="ph-col-6 big"></div>
                      <div class="ph-col-4 empty big"></div>
                      <div class="ph-col-2 big"></div>
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-picture"></div>
                    <div class="ph-row">
                      <div class="ph-col-6 big"></div>
                      <div class="ph-col-4 empty big"></div>
                      <div class="ph-col-2 big"></div>
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-picture"></div>
                    <div class="ph-row">
                      <div class="ph-col-6 big"></div>
                      <div class="ph-col-4 empty big"></div>
                      <div class="ph-col-2 big"></div>
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
}
