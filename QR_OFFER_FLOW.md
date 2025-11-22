# QR Code Offer Activation & Redemption Flow

## Overview
This document describes the complete flow for activating and redeeming offers using QR codes.

## Flow Diagram

```
1. User browses offers → Clicks "Activate" → Creates userOffer with status "pending"
2. Admin scans user's QR code → Sees pending offers → Activates offer (status → "active")
3. User/Admin scans QR code → Offer redeemed (status → "redeemed")
```

## Step-by-Step Flow

### Step 1: User Activates an Offer
1. User navigates to a company's offers page (`/company/[id]`)
2. User sees list of offers with "Activate" button
3. User clicks "Activate" on an offer
4. System creates a document in `usersOffers` collection:
   ```javascript
   {
     userId: "user_uid",
     offerId: "offer_id",
     status: "pending",
     createdAt: Timestamp
   }
   ```
5. Button changes to "Activated" (disabled state)

### Step 2: Admin Scans User QR Code
1. Admin navigates to Admin Profile (`/admin-profile`)
2. Admin clicks "Scan QR Code"
3. Camera opens, admin scans user's QR code (contains user ID)
4. System verifies user exists in Firestore
5. System fetches all pending offers for that user
6. Admin sees list of pending offers with "Activate Offer" button for each

### Step 3: Admin Activates Offer
1. Admin clicks "Activate Offer" on a pending offer
2. System updates the `usersOffers` document:
   ```javascript
   {
     status: "active"  // Changed from "pending"
   }
   ```
3. User can now redeem this offer

### Step 4: Offer Redemption
1. User shows their QR code (or admin scans it again)
2. Admin can see active offers and click "Redeem"
3. System updates status to "redeemed"
4. Offer is marked as used

## Database Structure

### Collection: `usersOffers`
```javascript
{
  id: "auto_generated",
  userId: "firebase_auth_uid",
  offerId: "offer_document_id",
  status: "pending" | "active" | "redeemed",
  createdAt: Timestamp
}
```

### Status Values
- **pending**: User activated offer, waiting for admin approval
- **active**: Admin activated offer, user can redeem
- **redeemed**: Offer has been redeemed/used

## QR Code Format
QR code contains the user's Firebase Auth UID (string)

## Testing Checklist

### Test Case 1: User Activates Offer
- [ ] User logs in as client
- [ ] Navigate to company offers page
- [ ] Click "Activate" on an offer
- [ ] Verify button changes to "Activated"
- [ ] Check Firestore: `usersOffers` collection has new document with status "pending"

### Test Case 2: Admin Scans User QR
- [ ] Admin logs in
- [ ] Navigate to Admin Profile
- [ ] Click "Scan QR Code"
- [ ] Scan user's QR code (from user profile)
- [ ] Verify user is found
- [ ] Verify pending offers list appears

### Test Case 3: Admin Activates Offer
- [ ] After scanning user QR, see pending offers
- [ ] Click "Activate Offer" on a pending offer
- [ ] Verify success message
- [ ] Check Firestore: status changed to "active"
- [ ] User profile should show offer as "Active - Show QR to Redeem"

### Test Case 4: Offer Redemption
- [ ] User has active offer
- [ ] Admin scans user QR again
- [ ] Admin sees active offers
- [ ] Admin clicks "Redeem" (or implement redemption flow)
- [ ] Check Firestore: status changed to "redeemed"

## Files Modified/Created

### Mobile App
- `hooks/offers/useUserOffers.ts` - Manage user offers
- `hooks/admin/usePendingOffers.ts` - Manage pending offers for admin
- `components/offers/ActivateButton.tsx` - Activate button component
- `components/offers/OfferCardWithActivate.tsx` - Offer card with activate button
- `components/admin/PendingOffersList.tsx` - List of pending offers
- `components/profile/UserOffersList.tsx` - User's offers list
- `app/company/[id].tsx` - Updated with activate functionality
- `app/admin-profile.tsx` - Updated with pending offers management
- `app/profile.tsx` - Updated to show user's offers

### Backend
- `services/userOfferService.js` - Updated to include status field

## Notes
- QR code must contain user ID (Firebase Auth UID)
- All status changes are tracked in Firestore
- Users can see their offer status in their profile
- Admins can manage offers by scanning user QR codes

