// Admin.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import ProductForm from './ProductForm';

export const Admin: React.FC = () => {
  const handleAddProduct = (product: { productName: string, productCategory: string, productDescription: string, images: string[] }) => {
    console.log(product);
  };

  return (
    <Container className="mt-5">
      <ProductForm onAddProduct={handleAddProduct} />
    </Container>
  );
};
