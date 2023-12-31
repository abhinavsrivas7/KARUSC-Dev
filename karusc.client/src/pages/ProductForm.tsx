// ProductForm.tsx
import React, { useState, useRef } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [productName, setProductName] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const selectedFileArray: File[] = Array.from(selectedFiles);

    const newImages: string[] = selectedFileArray.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prevImages) => [...prevImages, ...newImages]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input after selecting files
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleAddProduct = () => {
    const product: Product = {
      productName,
      productCategory,
      productDescription,
      images,
    };

    onAddProduct(product);

    // Reset form fields
    setProductName('');
    setProductCategory('');
    setProductDescription('');
    setImages([]);
  };

  return (
    <Card.Body>
      <h2>Add Product</h2>
      <Form>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Form.Group>

        {images.length > 0 && (
          <Row xs={1} md={3} className="g-4 mt-3">
            {images.map((imageUrl, index) => (
              <Col key={index}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    style={{ cursor: 'pointer', height: '150px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <br />
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Form>
    </Card.Body>
  );
};

export default ProductForm;
