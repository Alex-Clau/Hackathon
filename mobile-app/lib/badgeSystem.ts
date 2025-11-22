export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  kgRequired: number;
  color: string;
  earnedAt?: Date;
}

export interface DonationStats {
  totalKg: number;
  co2Saved: number; // in kg
  waterSaved: number; // in liters
  badges: Badge[];
}

export const BADGES: Badge[] = [
  {
    id: "first_kg",
    name: "First Step",
    description: "Donated your first kilogram",
    icon: "leaf-outline",
    kgRequired: 1,
    color: "#4F6F52",
  },
  {
    id: "eco_warrior_50",
    name: "Eco Warrior",
    description: "Donated 50kg of clothing",
    icon: "trophy-outline",
    kgRequired: 50,
    color: "#588157",
  },
  {
    id: "planet_hero_100",
    name: "Planet Hero",
    description: "Donated 100kg of clothing",
    icon: "medal-outline",
    kgRequired: 100,
    color: "#3A5A40",
  },
  {
    id: "legend_200",
    name: "Sustainability Legend",
    description: "Donated 200kg of clothing",
    icon: "star",
    kgRequired: 200,
    color: "#1A4D2E",
  },
];

// Environmental impact calculations
export const calculateEnvironmentalImpact = (kgDonated: number) => {
  const CO2_PER_KG = 3.6; // kg CO2 saved per kg donated
  const WATER_PER_KG = 15000; // liters of water saved per kg (mid-range estimate)
  return {
    co2Saved: kgDonated * CO2_PER_KG,
    waterSaved: kgDonated * WATER_PER_KG,
    treesEquivalent: (kgDonated * CO2_PER_KG) / 21, // Average tree absorbs ~21kg CO2/year
    landfillSpaceSaved: kgDonated * 0.5, // cubic meters (rough estimate)
  };
};

// Check which badges user has earned
export const getEarnedBadges = (totalKg: number): Badge[] => {
  return BADGES.filter((badge) => totalKg >= badge.kgRequired).map((badge) => ({
    ...badge,
    earnedAt: new Date(),
  }));
};

// Get next badge to earn
export const getNextBadge = (totalKg: number): Badge | null => {
  const nextBadge = BADGES.find((badge) => totalKg < badge.kgRequired);
  return nextBadge || null;
};

