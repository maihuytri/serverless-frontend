"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchBar({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) {
      params.set("query", query)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}
