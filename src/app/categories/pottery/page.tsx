// src/app/categories/pottery/page.tsx
import { Suspense } from "react";
import FilteredProducts from "@/components/marketplace/FilteredProducts";

export default function PotteryPage() {
  return (
    <Suspense fallback={<div>Loading pottery...</div>}>
      <FilteredProducts title="Pottery" />
    </Suspense>
  );
}
