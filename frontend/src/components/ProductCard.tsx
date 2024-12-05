import React from "react";
import { Product } from "../types/product";
import { Edit2, Trash2, Star, ThumbsUp } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <div className="flex space-x-2">
            {product.isBestseller && (
              <Star className="text-yellow-500" size={20} />
            )}
            {product.isRecommended && (
              <ThumbsUp className="text-blue-500" size={20} />
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              product.status === "active"
                ? "bg-green-100 text-green-800"
                : product.status === "inactive"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </span>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
