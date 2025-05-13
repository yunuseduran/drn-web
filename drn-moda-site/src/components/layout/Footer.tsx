'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  // Yıl bilgisini otomatik al
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo ve Kısa Bilgi */}
          <div className="col-span-1">
            <div className="mb-6">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <Image 
                  src="/images/drn-moda-logo.png" 
                  alt="DRN Moda Tekstil Logo" 
                  width={180} 
                  height={50} 
                  className="h-auto"
                />
              </div>
              <p className="text-gray-400 mb-4">
                DRN Moda Tekstil, 30 yıllık tecrübesiyle tekstil sektöründe
                kalite ve yenilikçiliğin öncüsü olmaya devam ediyor.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <div className="w-10 h-10 bg-[#af8107] rounded-full flex items-center justify-center hover:bg-[#8f6c06] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Twitter">
                <div className="w-10 h-10 bg-[#af8107] rounded-full flex items-center justify-center hover:bg-[#8f6c06] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <div className="w-10 h-10 bg-[#af8107] rounded-full flex items-center justify-center hover:bg-[#8f6c06] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" aria-label="Instagram">
                <div className="w-10 h-10 bg-[#af8107] rounded-full flex items-center justify-center hover:bg-[#8f6c06] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Hızlı Linkler */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Anasayfa</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/ne-yapiyoruz" className="text-gray-400 hover:text-white transition-colors">Ne Yapıyoruz</Link>
              </li>
              <li>
                <Link href="/nerede-yapiyoruz" className="text-gray-400 hover:text-white transition-colors">Nerede Yapıyoruz</Link>
              </li>
              <li>
                <Link href="/surdurulebilirlik" className="text-gray-400 hover:text-white transition-colors">Sürdürülebilirlik</Link>
              </li>
              <li>
                <Link href="/insan-kaynaklari" className="text-gray-400 hover:text-white transition-colors">İnsan Kaynakları</Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link>
              </li>
            </ul>
          </div>
          
          {/* Ürünlerimiz */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6">Ürünlerimiz</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Hazır Giyim</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Ev Tekstili</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Fitness & Spor</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Günlük Giyim</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Organik Tekstil</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-gray-400 hover:text-white transition-colors">Moda Koleksiyonları</Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="text-[#af8107] hover:text-white transition-colors font-medium">Tüm Ürünler</Link>
              </li>
            </ul>
          </div>
          
          {/* İletişim Bilgileri */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#af8107] mt-1 mr-3 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-gray-400">
                  Organize Sanayi Bölgesi, Mermerciler Cad. No:123, Beylikdüzü, İstanbul
                </span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#af8107] mr-3 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-gray-400">+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#af8107] mr-3 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-gray-400">info@drnmoda.com</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#af8107] mr-3 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400">Pzt - Cuma: 08:30 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} DRN Moda Tekstil. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4">
              <Link href="/gizlilik-politikasi" className="text-gray-500 text-sm hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-gray-500 text-sm hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/cerez-politikasi" className="text-gray-500 text-sm hover:text-white transition-colors">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 