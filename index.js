class ProductManager {
  constructor() {
    this.productId = 1
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(productData) {
    // Verificar si el "code", "title" y "thumbnail" ya existe en algún producto
    // Pueden haber productos con misma "description", "price" o "stock"
    const titleExists = this.products.some((product) => product.title === productData.title);
    const codeExists = this.products.some((product) => product.code === productData.code);
    const thumbnailExists = this.products.some((product) => product.thumbnail === productData.thumbnail);

    if (codeExists || titleExists || thumbnailExists) {
      throw new Error("Product already added.");
    }

    // Asigno Id al nuevo producto
    const newProduct = { ...productData, id: this.productId };

    // Agrego el nuevo producto al array
    this.products.push(newProduct);

    this.productId++

    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  }

  updateProduct(productId, updatedData) {
    const productIndex = this.products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
      throw new Error("Product not found.");
    }

    // Evitar que se cambie el id
    if (updatedData.id && updatedData.id !== productId) {
      throw new Error("You cannot change the product id.");
    }

    // Actualizar los campos permitidos del producto
    const allowedFields = ["title", "description", "price", "thumbnail", "code", "stock"];
    for (const field of allowedFields) {
      if (updatedData.hasOwnProperty(field)) {
        this.products[productIndex][field] = updatedData[field];
      }
    }

    return this.products[productIndex];
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
      throw new Error("Product not found.");
    }

    // Eliminar el producto de la lista
    const deletedProduct = this.products.splice(productIndex, 1)[0];

    return deletedProduct;
  }
}

const productManager = new ProductManager();

const emptyProducts = productManager.getProducts();
console.log(`There are no available products. ${emptyProducts}`);

try {
  const newProduct = productManager.addProduct({
    title: "Test product",
    description: "This is a test product",
    price: 200,
    thumbnail: "img",
    code: "abc123",
    stock: 25,
  });
  console.log("New product added:", newProduct);

  // Llamar a getProducts nuevamente (debe mostrar el producto recién agregado)
  const productsWithNewProduct = productManager.getProducts();
  console.log("Products array with the new product added:", productsWithNewProduct);

  // Intentar agregar un producto con el mismo código (debe arrojar un error)
  productManager.addProduct({
    title: "Repeated product",
    description: "This is a repeat product",
    price: 300,
    thumbnail: "img",
    code: "abc123",
    stock: 10,
  });
} catch (error) {
  console.error("Error:", error.message);
}

// Obtener un producto por ID 
const arrProducts = productManager.getProducts()
const productId = arrProducts.map((product) => {
  return product.id
})
let parseProductId = parseInt(productId)
const productIdToFind = parseProductId

try {
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log("Product found by ID:", foundProduct);
} catch (error) {
  console.error("Error:", error.message);
}

// Update
try {
  const updatedProduct = productManager.updateProduct(productIdToFind, {
    title: "Updated product",
    description: "This is an updated product",
    price: 250,
  });
  console.log("Updated product:", updatedProduct);
} catch (error) {
  console.error("Error:", error.message);
}

// Delete
try {
  const deletedProduct = productManager.deleteProduct(productIdToFind);
  console.log("Deleted product:", deletedProduct);
} catch (error) {
  console.error("Error:", error.message);
}

const updatedProductsList = productManager.getProducts();
console.log("Updated products list:", updatedProductsList);