import ProductGrid from "@/components/product-grid"
import SearchBar from "@/components/search-bar"
import { apiClient } from "@/lib/api-client"

export default async function Home({ searchParams }) {
  // Ensure searchParams is properly awaited
  const params = await Promise.resolve(searchParams)
  const query = params.query || ""
  const products = await apiClient.products.getAll(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">E-commerce Store</h1>
      <SearchBar initialQuery={query} />
      <ProductGrid products={products} />
    </div>
  )
}
