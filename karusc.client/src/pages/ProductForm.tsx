import React, { useState, useRef } from 'react';
import { Form, Button, Card, Col, Row, Modal } from 'react-bootstrap';
import { Product } from '../models/Product';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: -1,
      title: productName,
      price: typeof productPrice === 'number' ? productPrice : 0,
      description: productDescription,
      category: productCategory,
      image: images,
    };
    console.log(product);
    onAddProduct(product);

    setProductName('');
    setProductCategory('');
    setProductDescription('');
    setProductPrice('');
    setImages([]);
  };

  return (
    <Card>
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
          <Form.Group controlId="productPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(parseInt(e.target.value) || 0)}
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
                      onClick={() => handleImageClick(imageUrl)}
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

          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Form>
      </Card.Body>

      {/* Modal for Full-size Image */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="text-center">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full-size"
              style={{ maxWidth: '100%', maxHeight: '90vh', margin: 'auto' }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ProductForm;
