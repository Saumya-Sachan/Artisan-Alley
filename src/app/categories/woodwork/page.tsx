// src/app/categories/woodwork/page.tsx
import { Suspense } from "react";
import FilteredProducts from "@/components/marketplace/FilteredProducts";

export default function WoodworkPage() {
  return (
    <Suspense fallback={<div>Loading woodwork...</div>}>
      <FilteredProducts title="Woodwork" />
    </Suspense>
  );
}
