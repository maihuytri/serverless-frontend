import { getProductById } from "@/lib/products"
import Image from "next/image"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/add-to-cart-button"

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-3xl font-bold mt-4">${product.price.toFixed(2)}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <p className="text-muted-foreground">{product.category}</p>
          </div>

          <div className="mt-auto pt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
