import { Suspense } from "react";
import MarketplaceClient from "./MarketplaceClient";

export default function MarketplacePage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Marketplace</h1>
      <Suspense fallback={<p>Loading marketplace...</p>}>
        <MarketplaceClient />
      </Suspense>
    </div>
  );
}
