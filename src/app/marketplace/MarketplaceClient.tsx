"use client";

import { useSearchParams } from "next/navigation";

export default function MarketplaceClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  return (
    <div>
      <h2>Showing products in: {category}</h2>
      {/* Render your product list here */}
    </div>
  );
}
