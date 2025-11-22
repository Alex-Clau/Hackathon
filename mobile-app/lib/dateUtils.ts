/**
 * Utility functions for date formatting
 */

export const formatDate = (date: any): string => {
  if (!date) return "N/A";

  let dateObj: Date | null = null;

  // 1. Handle Firestore Timestamp object (Client SDK)
  if (date && typeof date.toDate === 'function') {
    dateObj = date.toDate();
  }
  // 2. Handle serialized Firestore Timestamp (Server SDK / JSON)
  else if (date && date._seconds !== undefined) {
    dateObj = new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000);
  }
  // 3. Handle ISO string or standard Date object
  else {
    try {
      dateObj = new Date(date);
    } catch (e) {
      return "N/A";
    }
  }

  // If valid date object, format it strictly as DD.MM.YYYY
  if (dateObj && !isNaN(dateObj.getTime())) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  }

  return "N/A";
};

export const isOfferActive = (date: any): boolean => {
  if (!date) return false;
  const endDate = date.toDate ? date.toDate() : new Date(date);
  return endDate > new Date();
};

