import { redirect } from 'next/navigation';

// Yanlış URL'yi doğru URL'ye yönlendir
export default function UrunlerimizStaticRedirect() {
  redirect('/urunlerimiz');
} 