// src/app/categories/jewelry/page.tsx
import { Suspense } from "react";
import FilteredProducts from "@/components/marketplace/FilteredProducts"; 
export default function JewelryPage() {
  return (
    <Suspense fallback={<div>Loading jewelry...</div>}>
      <FilteredProducts title="Jewelry" />
    </Suspense>
  );
}
