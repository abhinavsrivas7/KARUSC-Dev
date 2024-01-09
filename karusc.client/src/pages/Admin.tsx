import React from 'react';
import { Container } from 'react-bootstrap';
import ProductForm from './ProductForm';
import { Product } from '../models/Product'; 

export const Admin: React.FC = () => {
  const handleAddProduct = (product: Product) => {
    console.log(product);
  };

  return (
    <Container className="mt-5">
      <ProductForm onAddProduct={handleAddProduct} />
    </Container>
  );
};
