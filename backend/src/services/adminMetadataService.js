import { db } from '../config/firebase.js';
import { adminUsers } from '../data/initData.js';

export const initAdminMetadata = async (companyIds) => {
  const metadataIds = [];
  
  for (const admin of adminUsers) {
    const companyId = companyIds[admin.companyIndex];
    if (!companyId) continue;
    
    const docRef = await db.collection('adminMetadata').add({
      email: admin.email,
      name: admin.name,
      role: admin.role,
      companyId,
    });
    metadataIds.push(docRef.id);
  }
  
  return { metadataIds, count: metadataIds.length };
};

