export interface Dish {
  id: string;
  name: string;
  category: 'pasta' | 'antipasti' | 'pizza' | 'secondi' | 'dolci';
  italianName?: string;
  price: number;
  description: string;
  tag?: string;
  origin?: string;
  pairing?: string;
  image?: string;
  dietary?: string[];
  isSignature?: boolean;
}

export interface PhilosophyPillar {
  number: string;
  category: string;
  title: string;
  description: string;
  specifications: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  spanClass: string;
  alt: string;
}

export interface ReservationData {
  partySize: string;
  date: string;
  timeSlot: string;
  seatingArea: 'Main Dining Room' | 'Hearth Chef Counter' | 'Outdoor Heated Loggia';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}
