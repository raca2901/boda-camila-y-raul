export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export type DietaryPreference = 'standard' | 'vegetarian' | 'vegan' | 'gluten_free' | 'other';

export interface Guest {
  id: string; // Unique UUID (e.g. "e8a8b132-7fd8-4d5c-9c02-e22131ec8701")
  code: string; // Optional short code (e.g. "FLIAPEREZ")
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

// Generate RFC4122 compliant UUID v4
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
