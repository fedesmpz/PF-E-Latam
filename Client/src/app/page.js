'use client'
import Landing from '@/pages/Landing';
import { useRouter } from 'next/navigation';

export default function App() {
  
  const router = useRouter()
  
  return (
    <div>

        <Landing></Landing>

    </div>
  )
}
