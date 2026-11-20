export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export type DietaryPreference = 'standard' | 'vegetarian' | 'vegan' | 'gluten_free' | 'other';

export interface Guest {
  id: string;
  code: string; // Unique short code for personalized link, e.g. "FLIAPEREZ"
  name: string;
  phone?: string;
  passes: number; // Maximum allowed guests
  confirmedPasses: number; // Actual attending count
  status: RsvpStatus;
  dietaryPreference?: DietaryPreference;
  dietaryNotes?: string;
  notes?: string; // Romantic message or well-wishes from the guest
  updatedAt?: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  weddingDate: string; // ISO 8601 string
  ceremonyTime: string;
  receptionTime: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyMapsUrl: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDescription: string;
  bankAccountInfo: {
    bankName: string;
    accountType: string;
    accountNumber: string;
    holderName: string;
    idNumber: string;
  };
}
