'use client'
import Landing from '@/pages/Landing';
import CreateProduct from "@/pages/CreateProduct";
import { useRouter } from 'next/navigation';

export default function App() {
  
  const router = useRouter()
  
  return (
    <div>

        { router.pathname === "/CreateProduct" && <CreateProduct></CreateProduct> }

        <Landing></Landing>

    </div>
  )
}
