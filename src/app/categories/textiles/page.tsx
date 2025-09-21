// src/app/categories/textiles/page.tsx
import { Suspense } from "react";
import FilteredProducts from "@/components/marketplace/FilteredProducts";

export default function TextilesPage() {
  return (
    <Suspense fallback={<div>Loading textiles...</div>}>
      <FilteredProducts title="Textiles" />
    </Suspense>
  );
}
