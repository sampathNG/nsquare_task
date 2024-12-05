export type ProductStatus = "active" | "inactive" | "draft";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isRecommended: boolean;
  isBestseller: boolean;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}
