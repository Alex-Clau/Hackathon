import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Badge, getEarnedBadges } from "../../lib/badgeSystem";

export const useDonationStats = () => {
  const [totalKg, setTotalKg] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const previousBadgeCount = useRef(0);

  const fetchDonationStats = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const kgDonated = userData.totalKgDonated || 0;
        setTotalKg(kgDonated);

        const currentBadges = getEarnedBadges(kgDonated);

        // Check if a new badge was earned
        if (
          currentBadges.length > previousBadgeCount.current &&
          previousBadgeCount.current > 0
        ) {
          const latestBadge = currentBadges[currentBadges.length - 1];
          setNewBadge(latestBadge);
        }

        previousBadgeCount.current = currentBadges.length;
        setEarnedBadges(currentBadges);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching donation stats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationStats();
  }, []);

  const refreshStats = () => {
    fetchDonationStats();
  };

  const clearNewBadge = () => {
    setNewBadge(null);
  };

  return {
    totalKg,
    earnedBadges,
    loading,
    refreshStats,
    newBadge,
    clearNewBadge,
  };
};

