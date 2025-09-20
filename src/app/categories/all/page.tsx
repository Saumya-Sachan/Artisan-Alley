// src/app/categories/all/page.tsx
import { Suspense } from "react";
import FilteredProducts from "@/components/marketplace/FilteredProducts";

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <FilteredProducts title="All Products" />
    </Suspense>
  );
}
