import { Suspense } from "react";
import MarketplaceClient from "./MarketplaceClient";

export default function MarketplacePage() {
  return (
    <div style={{ padding: "20px" }}>
      <Suspense fallback={<p>Loading marketplace...</p>}>
        <MarketplaceClient />
      </Suspense>
    </div>
  );
}
