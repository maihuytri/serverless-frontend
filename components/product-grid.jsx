import ProductCard from "./product-card"

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center py-12 text-muted-foreground">
          No products found. Try a different search term.
        </p>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  )
}
