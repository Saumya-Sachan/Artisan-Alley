export type Product = {
  id: string;
  name: string;
  artisanId: string;
  price: number;
  category: 'Pottery' | 'Jewelry' | 'Textiles' | 'Woodwork';
  productType: string;
  images: string[];
  description: string;
  makingProcess: string;
  region: string;
  material: string;
  sustainability?: 'Eco-Friendly' | 'Recycled Materials' | 'Sustainably Sourced';
};

export type Artisan = {
  id: string;
  name: string;
  location: string;
  email: string;
  story: string;
  profileImage: string;
  bannerImage: string;
  verified: boolean;
};

export type Review = {
  id: string;
  productId: string;
  reviewer: string;
  rating: number;
  comment: string;
};

export type CartItem = Product & {
  quantity: number;
};
