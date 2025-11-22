import { db } from '../config/firebase.js';
import { getCompanyById } from './companyService.js';

const getFullImageUrl = (logoPath) => {
  if (!logoPath) return '';
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    return logoPath;
  }
  const host = process.env.API_HOST || '192.168.34.48';
  const port = process.env.PORT || 3000;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}:${port}${logoPath.startsWith('/') ? logoPath : '/' + logoPath}`;
};

export const getAllOffers = async () => {
  const snapshot = await db.collection('offers').get();
  const offers = [];

  for (const doc of snapshot.docs) {
    const offerData = doc.data();
    const company = await getCompanyById(offerData.companyId);

    offers.push({
      id: doc.id,
      companyId: offerData.companyId,
      companyName: company?.name || 'Unknown',
      companyLogo: getFullImageUrl(company?.logo),
      productOfferName: offerData.productOfferName,
      discountSize: offerData.discountSize,
      description: offerData.description || '',
      offerEndDate: offerData.offerEndDate,
      createdAt: offerData.createdAt,
    });
  }

  return offers;
};

export const getOffersGroupedByCompany = async () => {
  const offers = await getAllOffers();
  const companyMap = new Map();

  offers.forEach((offer) => {
    if (!companyMap.has(offer.companyId)) {
      companyMap.set(offer.companyId, {
        id: offer.companyId,
        companyName: offer.companyName,
        imageUrl: getFullImageUrl(offer.companyLogo),
        title: offer.companyName,
        offersCount: 0,
        offers: [],
      });
    }

    const company = companyMap.get(offer.companyId);
    company.offersCount++;
    company.offers.push(offer);
  });

  return Array.from(companyMap.values());
};

export const getOfferById = async (offerId) => {
  const doc = await db.collection('offers').doc(offerId).get();
  if (!doc.exists) {
    return null;
  }

  const offerData = doc.data();
  const company = await getCompanyById(offerData.companyId);

  return {
    id: doc.id,
    companyId: offerData.companyId,
    companyName: company?.name || 'Unknown',
    companyLogo: getFullImageUrl(company?.logo),
    productOfferName: offerData.productOfferName,
    discountSize: offerData.discountSize,
    offerEndDate: offerData.offerEndDate,
    createdAt: offerData.createdAt,
  };
};

export const getOffersByCompanyId = async (companyId) => {
  const snapshot = await db
    .collection('offers')
    .where('companyId', '==', companyId)
    .get();

  const company = await getCompanyById(companyId);
  const offers = [];

  for (const doc of snapshot.docs) {
    const offerData = doc.data();
    offers.push({
      id: doc.id,
      companyId: offerData.companyId,
      companyName: company?.name || 'Unknown',
      companyLogo: getFullImageUrl(company?.logo),
      productOfferName: offerData.productOfferName,
      discountSize: offerData.discountSize,
      description: offerData.description || '',
      offerEndDate: offerData.offerEndDate,
      createdAt: offerData.createdAt,
    });
  }

  return offers;
};

