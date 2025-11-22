export const companies = [
  {
    name: 'Nike',
    logo: '/images/companies/nike.png',
  },
  {
    name: 'Adidas',
    logo: '/images/companies/adidas.png',
  },
  {
    name: 'Zara',
    logo: '/images/companies/zara.png',
  },
  {
    name: 'H&M',
    logo: '/images/companies/hm.png',
  },
  {
    name: 'Puma',
    logo: '/images/companies/puma.png',
  },
];

// Offers will have companyId added by script (using index to reference company)
export const offers = [
  // Nike (3 offers)
  {
    companyIndex: 0,
    productOfferName: 'Air Max Running Shoes Collection',
    discountSize: '30%',
    offerEndDate: new Date('2024-12-31'), // Far out
  },
  {
    companyIndex: 0,
    productOfferName: 'Dri-FIT Sportswear Bundle',
    discountSize: '$50 off',
    offerEndDate: new Date('2024-11-30'), // Soon
  },
  {
    companyIndex: 0,
    productOfferName: 'Jordan Retro Sneakers',
    discountSize: '25%',
    offerEndDate: new Date('2024-10-15'), // Expired
  },
  // Adidas (3 offers)
  {
    companyIndex: 1,
    productOfferName: 'Ultraboost Running Shoes',
    discountSize: '25%',
    offerEndDate: new Date('2024-12-15'), // Far out
  },
  {
    companyIndex: 1,
    productOfferName: 'Originals Streetwear Collection',
    discountSize: '$40 off',
    offerEndDate: new Date('2024-11-05'), // Soon
  },
  {
    companyIndex: 1,
    productOfferName: 'Yeezy Collection - Select Items',
    discountSize: '20%',
    offerEndDate: new Date('2024-09-20'), // Expired
  },
  // Zara (3 offers)
  {
    companyIndex: 2,
    productOfferName: 'Winter Coat Collection',
    discountSize: '40%',
    offerEndDate: new Date('2024-12-20'), // Far out
  },
  {
    companyIndex: 2,
    productOfferName: 'Business Casual Attire',
    discountSize: '$60 off',
    offerEndDate: new Date('2024-11-18'), // Soon
  },
  {
    companyIndex: 2,
    productOfferName: 'Summer Dresses & Tops',
    discountSize: '35%',
    offerEndDate: new Date('2024-10-01'), // Expired
  },
  // H&M (3 offers)
  {
    companyIndex: 3,
    productOfferName: 'Denim Jeans Collection',
    discountSize: '30%',
    offerEndDate: new Date('2024-11-25'), // Soon
  },
  {
    companyIndex: 3,
    productOfferName: 'Basic Essentials Bundle',
    discountSize: '$25 off',
    offerEndDate: new Date('2024-12-28'), // Far out
  },
  {
    companyIndex: 3,
    productOfferName: 'Kids Clothing Collection',
    discountSize: '40%',
    offerEndDate: new Date('2024-08-31'), // Expired
  },
  // Puma (3 offers)
  {
    companyIndex: 4,
    productOfferName: 'RS-X Sneakers Collection',
    discountSize: '30%',
    offerEndDate: new Date('2024-12-10'), // Soon
  },
  {
    companyIndex: 4,
    productOfferName: 'Training Apparel Bundle',
    discountSize: '$35 off',
    offerEndDate: new Date('2024-12-31'), // Far out
  },
  {
    companyIndex: 4,
    productOfferName: 'Classic Suede Sneakers',
    discountSize: '25%',
    offerEndDate: new Date('2024-09-15'), // Expired
  },
];

export const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'client',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'client',
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'client',
  },
];

export const adminUsers = [
  {
    name: 'Nike Admin',
    email: 'admin@nike.com',
    role: 'admin',
    companyIndex: 0,
  },
  {
    name: 'Adidas Admin',
    email: 'admin@adidas.com',
    role: 'admin',
    companyIndex: 1,
  },
  {
    name: 'Zara Admin',
    email: 'admin@zara.com',
    role: 'admin',
    companyIndex: 2,
  },
  {
    name: 'H&M Admin',
    email: 'admin@hm.com',
    role: 'admin',
    companyIndex: 3,
  },
  {
    name: 'Puma Admin',
    email: 'admin@puma.com',
    role: 'admin',
    companyIndex: 4,
  },
];

// Users-Offers: uses indices to reference user and offer
export const usersOffers = [
  // John Doe - 4 offers
  {
    userIndex: 0,
    offerIndex: 0, // Air Max Running Shoes
  },
  {
    userIndex: 0,
    offerIndex: 6, // Winter Coat Collection
  },
  {
    userIndex: 0,
    offerIndex: 9, // Denim Jeans Collection
  },
  {
    userIndex: 0,
    offerIndex: 12, // RS-X Sneakers Collection
  },
  // Jane Smith - 4 offers
  {
    userIndex: 1,
    offerIndex: 1, // Dri-FIT Sportswear Bundle
  },
  {
    userIndex: 1,
    offerIndex: 7, // Business Casual Attire
  },
  {
    userIndex: 1,
    offerIndex: 10, // Basic Essentials Bundle
  },
  {
    userIndex: 1,
    offerIndex: 13, // Training Apparel Bundle
  },
  // Bob Johnson - 4 offers
  {
    userIndex: 2,
    offerIndex: 2, // Jordan Retro Sneakers
  },
  {
    userIndex: 2,
    offerIndex: 5, // Yeezy Collection
  },
  {
    userIndex: 2,
    offerIndex: 8, // Summer Dresses & Tops
  },
  {
    userIndex: 2,
    offerIndex: 14, // Classic Suede Sneakers
  },
];
