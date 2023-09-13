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
    const titleComparator = this.products.some((product) => product.title === productData.title);
    const codeComparator = this.products.some((product) => product.code === productData.code);
    const thumbnailComparator = this.products.some((product) => product.thumbnail === productData.thumbnail);
    if (codeComparator || titleComparator || thumbnailComparator) {
      throw new Error("Producto ya agregado.");
    }

    // Asignar Id al nuevo producto
    const newProduct = { ...productData, id: this.productId };

    // Agrego el nuevo producto al array
    this.products.push(newProduct);

    this.productId++

    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }
}

const productManager = new ProductManager();

const soldOut = productManager.getProducts();
console.log(`No hay productos disponibles. ${soldOut}`);

try {
  const newProduct = productManager.addProduct({
    title: "Producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log("Nuevo producto agregado:", newProduct);

  // Llamar a getProducts
  const currentProducts = productManager.getProducts();
  console.log("Array de productos actualizada:", currentProducts);

  // Agregar un producto con el mismo código (error)
  productManager.addProduct({
    title: "Producto repetido",
    description: "Este producto esta repetido",
    price: 300,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 10,
  });
} catch (error) {
  console.error("Error:", error.message);
}

// Encontrar  producto por ID 
const arrayProducts = productManager.getProducts()
const productId = arrayProducts.map((product) => {
  return product.id
})
let parseProductId = parseInt(productId)
const productIdToFind = parseProductId

try {
  const foundProduct = productManager.getProductById(productIdToFind);
  console.log("Producto encontrado por ID:", foundProduct);
} catch (error) {
  console.error("Error:", error.message);
}