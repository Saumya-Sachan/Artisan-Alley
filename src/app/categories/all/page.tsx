// src/app/categories/all/page.tsx
import { Suspense } from "react";
import AllProductsContent from "../../marketplace/FilteredProducts";

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <AllProductsContent />
    </Suspense>
  );
}
