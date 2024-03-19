describe('Product API Tests', () => {
  let productId;

  before(() => {
    // Create a new product for testing
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      // Add other required fields for creating a new product
    };

    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/api/products',
      body: newProduct,
    }).then((response) => {
      expect(response.status).to.equal(201);
      productId = response.body.id; // Store the newly created product ID
    });
  });

  it('should return a list of products', () => {
    cy.request('GET', 'https://dummyjson.com/api/products')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
        // Additional assertions for the response body can be added here
      });
  });

  it('should return details of a specific product', () => {
    cy.request(`GET`, `https://dummyjson.com/api/products/${productId}`)
      .then((response) => {
        expect(response.status).to.equal(200);
        // Additional assertions for the response body can be added here
      });
  });

  it('should update an existing product', () => {
    const updatedProduct = {
      name: 'Updated Product',
      price: 150,
      // Add other fields to update for the product
    };

    cy.request({
      method: 'PUT',
      url: `https://dummyjson.com/api/products/${productId}`,
      body: updatedProduct,
    }).then((response) => {
      expect(response.status).to.equal(200);
      // Additional assertions for the response body can be added here
    });
  });

  it('should delete an existing product', () => {
    cy.request({
      method: 'DELETE',
      url: `https://dummyjson.com/api/products/${productId}`,
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it('should handle invalid product ID gracefully', () => {
    const invalidProductId = 'invalid_id';

    cy.request({
      method: 'GET',
      url: `https://dummyjson.com/api/products/${invalidProductId}`,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-200 responses
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it('should handle missing required fields when creating a new product', () => {
    const newProduct = {
      // Missing required fields
    };

    cy.request({
      method: 'POST',
      url: 'https://dummyjson.com/api/products',
      body: newProduct,
      failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  after(() => {
    // Clean up by deleting the test product
    cy.request({
      method: 'DELETE',
      url: `https://dummyjson.com/api/products/${productId}`,
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });
});
