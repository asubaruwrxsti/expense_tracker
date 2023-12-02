import Link from 'next/link';
import ProductCard from "@/app/components/ProductCard";
import Dashboard from "@/app/components/Dashboard";
export default function Home() {
  return (
    <main>
        <div>
            {/*<h1>Home</h1>*/}
            {/*<Link href={'/users'}>Users</Link>*/}
            {/*<ProductCard />*/}
            <Dashboard />
        </div>
    </main>
  )
}
