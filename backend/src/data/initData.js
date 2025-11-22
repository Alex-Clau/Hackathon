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
// All offers have dates far in the future to ensure they don't expire
export const offers = [
  // Nike (3 offers)
  {
    companyIndex: 0,
    productOfferName: 'Air Max Running Shoes Collection',
    discountSize: '30%',
    description: 'Bring 4kgs of Nike clothing items to activate this offer',
    offerEndDate: new Date('2027-12-31'), // Far future
  },
  {
    companyIndex: 0,
    productOfferName: 'Dri-FIT Sportswear Bundle',
    discountSize: '$50 off',
    description: 'Collect 3kgs of Nike sportswear to unlock this discount',
    offerEndDate: new Date('2027-11-30'), // Far future
  },
  {
    companyIndex: 0,
    productOfferName: 'Jordan Retro Sneakers',
    discountSize: '25%',
    description: 'Donate 5kgs of Nike apparel to redeem this exclusive offer',
    offerEndDate: new Date('2027-10-15'), // Far future
  },
  // Adidas (3 offers)
  {
    companyIndex: 1,
    productOfferName: 'Ultraboost Running Shoes',
    discountSize: '25%',
    description: 'Bring 4.5kgs of Adidas clothing to activate this offer',
    offerEndDate: new Date('2027-12-15'), // Far future
  },
  {
    companyIndex: 1,
    productOfferName: 'Originals Streetwear Collection',
    discountSize: '$40 off',
    description: 'Collect 3.5kgs of Adidas items to unlock this discount',
    offerEndDate: new Date('2027-11-05'), // Far future
  },
  {
    companyIndex: 1,
    productOfferName: 'Yeezy Collection - Select Items',
    discountSize: '20%',
    description: 'Donate 6kgs of Adidas apparel to redeem this special offer',
    offerEndDate: new Date('2027-09-20'), // Far future
  },
  // Zara (3 offers)
  {
    companyIndex: 2,
    productOfferName: 'Winter Coat Collection',
    discountSize: '40%',
    description: 'Bring 5kgs of Zara clothing to activate this winter offer',
    offerEndDate: new Date('2027-12-20'), // Far future
  },
  {
    companyIndex: 2,
    productOfferName: 'Business Casual Attire',
    discountSize: '$60 off',
    description: 'Collect 3kgs of Zara professional wear to unlock this discount',
    offerEndDate: new Date('2027-11-18'), // Far future
  },
  {
    companyIndex: 2,
    productOfferName: 'Summer Dresses & Tops',
    discountSize: '35%',
    description: 'Donate 4kgs of Zara summer clothing to redeem this offer',
    offerEndDate: new Date('2027-10-01'), // Far future
  },
  // H&M (3 offers)
  {
    companyIndex: 3,
    productOfferName: 'Denim Jeans Collection',
    discountSize: '30%',
    description: 'Bring 4kgs of H&M clothing to activate this denim offer',
    offerEndDate: new Date('2027-11-25'), // Far future
  },
  {
    companyIndex: 3,
    productOfferName: 'Basic Essentials Bundle',
    discountSize: '$25 off',
    description: 'Collect 2.5kgs of H&M basics to unlock this discount',
    offerEndDate: new Date('2027-12-28'), // Far future
  },
  {
    companyIndex: 3,
    productOfferName: 'Kids Clothing Collection',
    discountSize: '40%',
    description: 'Donate 5kgs of H&M kids clothing to redeem this family offer',
    offerEndDate: new Date('2027-08-31'), // Far future
  },
  // Puma (3 offers)
  {
    companyIndex: 4,
    productOfferName: 'RS-X Sneakers Collection',
    discountSize: '30%',
    description: 'Bring 4kgs of Puma clothing to activate this sneaker offer',
    offerEndDate: new Date('2027-12-10'), // Far future
  },
  {
    companyIndex: 4,
    productOfferName: 'Training Apparel Bundle',
    discountSize: '$35 off',
    description: 'Collect 3.5kgs of Puma sportswear to unlock this training discount',
    offerEndDate: new Date('2027-12-31'), // Far future
  },
  {
    companyIndex: 4,
    productOfferName: 'Classic Suede Sneakers',
    discountSize: '25%',
    description: 'Donate 5kgs of Puma apparel to redeem this classic offer',
    offerEndDate: new Date('2027-09-15'), // Far future
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
// status: 'pending', 'active', or 'redeemed'
export const usersOffers = [
  // John Doe - 4 offers (mix of pending and active)
  {
    userIndex: 0,
    offerIndex: 0, // Air Max Running Shoes - Nike
    status: 'active',
  },
  {
    userIndex: 0,
    offerIndex: 6, // Winter Coat Collection - Zara
    status: 'pending',
  },
  {
    userIndex: 0,
    offerIndex: 9, // Denim Jeans Collection - H&M
    status: 'active',
  },
  {
    userIndex: 0,
    offerIndex: 12, // RS-X Sneakers Collection - Puma
    status: 'pending',
  },
  // Jane Smith - 4 offers (mix of pending and active)
  {
    userIndex: 1,
    offerIndex: 1, // Dri-FIT Sportswear Bundle - Nike
    status: 'active',
  },
  {
    userIndex: 1,
    offerIndex: 7, // Business Casual Attire - Zara
    status: 'active',
  },
  {
    userIndex: 1,
    offerIndex: 10, // Basic Essentials Bundle - H&M
    status: 'pending',
  },
  {
    userIndex: 1,
    offerIndex: 13, // Training Apparel Bundle - Puma
    status: 'active',
  },
  // Bob Johnson - 4 offers (mix of pending and active)
  {
    userIndex: 2,
    offerIndex: 2, // Jordan Retro Sneakers - Nike
    status: 'pending',
  },
  {
    userIndex: 2,
    offerIndex: 5, // Yeezy Collection - Adidas
    status: 'active',
  },
  {
    userIndex: 2,
    offerIndex: 8, // Summer Dresses & Tops - Zara
    status: 'active',
  },
  {
    userIndex: 2,
    offerIndex: 14, // Classic Suede Sneakers - Puma
    status: 'pending',
  },
];
