import { Suspense } from "react";
import AllProductsClient from "./AllProductsClient";

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div>Loading all products...</div>}>
      <AllProductsClient />
    </Suspense>
  );
}
