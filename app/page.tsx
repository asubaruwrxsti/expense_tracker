import Link from 'next/link';
import ProductCard from "@/app/components/ProductCard";
import Expenses from "@/app/components/Expenses";
export default function Home() {
  return (
    <main>
        <div>
            <h1>Home</h1>
            <Link href={'/users'}>Users</Link>
            <ProductCard />
            <Expenses />
        </div>
    </main>
  )
}
