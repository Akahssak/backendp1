// In-memory database for demo purposes
// In production, this would connect to PostgreSQL/MongoDB

class Database {
  constructor() {
    this.users = [];
    this.products = [];
    this.orders = [];
    this.analytics = {
      sales: [],
      revenue: 0,
      totalOrders: 0,
      returns: 0
    };
    this.init();
  }

  init() {
    // Sample data for demo
    this.users = [
      {
        id: '1',
        email: 'seller@flipkart.com',
        password: '$2a$10$rOzHYQz8s6q.Uj9rF5P7wOQYG7FLjHQNKXVf5Q7oI.XGc.1vQpQKq', // password123
        name: 'John Seller',
        role: 'seller',
        status: 'active',
        businessName: 'TechStore Pro',
        phone: '+91-9876543210',
        address: 'Mumbai, Maharashtra',
        createdAt: new Date('2024-01-01')
      },
      {
        id: '2',
        email: 'admin@flipkart.com',
        password: '$2a$10$rOzHYQz8s6q.Uj9rF5P7wOQYG7FLjHQNKXVf5Q7oI.XGc.1vQpQKq', // admin123
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2024-01-01')
      }
    ];

    this.products = [
      {
        id: '1',
        sellerId: '1',
        name: 'iPhone 15 Pro Max',
        category: 'Electronics',
        price: 134900,
        discountPrice: 129900,
        stock: 25,
        description: 'Latest iPhone with advanced camera system',
        images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'],
        status: 'active',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        sellerId: '1',
        name: 'Samsung Galaxy Watch',
        category: 'Electronics',
        price: 24999,
        discountPrice: 22999,
        stock: 15,
        description: 'Advanced smartwatch with health tracking',
        images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
        status: 'active',
        createdAt: new Date('2024-01-20')
      }
    ];

    this.orders = [
      {
        id: 'ORD001',
        sellerId: '1',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh@email.com',
        amount: 129900,
        quantity: 1,
        status: 'shipped',
        paymentStatus: 'paid',
        shippingAddress: 'Delhi, India',
        orderDate: new Date('2024-01-25'),
        shippedDate: new Date('2024-01-26')
      },
      {
        id: 'ORD002',
        sellerId: '1',
        productId: '2',
        productName: 'Samsung Galaxy Watch',
        customerName: 'Priya Sharma',
        customerEmail: 'priya@email.com',
        amount: 22999,
        quantity: 1,
        status: 'pending',
        paymentStatus: 'paid',
        shippingAddress: 'Mumbai, India',
        orderDate: new Date('2024-01-27')
      }
    ];
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Product methods
  getProductsBySeller(sellerId) {
    return this.products.filter(product => product.sellerId === sellerId);
  }

  getAllProducts() {
    return this.products;
  }

  createProduct(productData) {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      return this.products.splice(index, 1)[0];
    }
    return null;
  }

  // Order methods
  getOrdersBySeller(sellerId) {
    return this.orders.filter(order => order.sellerId === sellerId);
  }

  getAllOrders() {
    return this.orders;
  }

  updateOrderStatus(orderId, status) {
    const index = this.orders.findIndex(order => order.id === orderId);
    if (index !== -1) {
      this.orders[index].status = status;
      if (status === 'shipped') {
        this.orders[index].shippedDate = new Date();
      }
      return this.orders[index];
    }
    return null;
  }

  // Analytics methods
  getAnalytics(sellerId) {
    const sellerOrders = this.getOrdersBySeller(sellerId);
    const totalRevenue = sellerOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = sellerOrders.length;
    const pendingOrders = sellerOrders.filter(order => order.status === 'pending').length;
    const shippedOrders = sellerOrders.filter(order => order.status === 'shipped').length;
    const deliveredOrders = sellerOrders.filter(order => order.status === 'delivered').length;

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      totalProducts: this.getProductsBySeller(sellerId).length,
      lowStockProducts: this.getProductsBySeller(sellerId).filter(product => product.stock < 10).length
    };
  }
}

export default new Database();