'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaPhone, FaFileAlt, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

// Animasyon varyantları
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function KariyerPage() {
  const searchParams = useSearchParams();
  
  // Form durumu
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null as File | null
  });
  
  // Gönderim durumu
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // URL'den pozisyon adını al
  useEffect(() => {
    const positionFromUrl = searchParams.get('position');
    if (positionFromUrl) {
      setFormData(prev => ({ ...prev, position: decodeURIComponent(positionFromUrl) }));
    }
    
    // Sayfanın her yüklenmesinde scroll'u sıfırla
    window.scrollTo(0, 0);
    
    // Body overflow'u otomatik olarak ayarla
    document.body.style.overflow = 'auto';
    
    // Component unmount olduğunda
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchParams]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // PDF kontrolü
      if (file.type !== 'application/pdf') {
        alert('Lütfen sadece PDF dosyası yükleyin.');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, cv: file }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!formData.fullName || !formData.email || !formData.phone || !formData.position || !formData.cv) {
      setErrorMessage('Lütfen tüm alanları doldurun ve CV yükleyin.');
      setSubmitStatus('error');
      return;
    }
    
    // E-posta format doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Lütfen geçerli bir e-posta adresi girin.');
      setSubmitStatus('error');
      return;
    }
    
    // Telefon format doğrulama (basit)
    const phoneRegex = /^[0-9\s\+\-\(\)]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Lütfen geçerli bir telefon numarası girin.');
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Burada gerçek bir API çağrısı yapılabilir
      // Örnek: FormData kullanarak CV dosyasını da içeren bir POST isteği
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('message', formData.message);
      if (formData.cv) {
        formDataToSend.append('cv', formData.cv);
      }
      
      console.log('Form gönderimi:', Object.fromEntries(formDataToSend));
      
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Başarılı
      setSubmitStatus('success');
      
      // Formu sıfırla
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        cv: null
      });
      
      // Sayfayı başa kaydır
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Form gönderimi hatası:', error);
      setErrorMessage('Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#333] to-[#af8107]"></div>
        <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-20 mix-blend-overlay"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kariyer Başvurusu</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {formData.position ? 
                `"${formData.position}" pozisyonu için başvurunuzu yapın.` : 
                "DRN Moda Tekstil ailesine katılmak için başvurunuzu yapın."}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-8"
          >
            <Link 
              href="/insan-kaynaklari" 
              className="inline-flex items-center text-gray-600 hover:text-[#af8107] mb-6"
            >
              <FaArrowLeft className="mr-2" /> Açık Pozisyonlara Dön
            </Link>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Başvuru Formu</h2>
            <div className="h-1 w-20 bg-[#af8107] mb-6"></div>
            <p className="text-gray-600">
              Aşağıdaki formu doldurarak başvurunuzu yapabilirsiniz. CV'nizi PDF formatında yüklemeniz gerekmektedir.
            </p>
          </motion.div>
          
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPaperPlane className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h3>
              <p className="text-gray-600 mb-6">
                Başvurunuz başarıyla alındı. İnsan Kaynakları ekibimiz başvurunuzu değerlendirecek ve sizinle iletişime geçecektir.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/insan-kaynaklari">
                  <button className="px-6 py-3 bg-[#af8107] hover:bg-[#8f6c06] text-white font-medium rounded-lg transition-colors">
                    Açık Pozisyonlara Dön
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors">
                    Ana Sayfaya Dön
                  </button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
                encType="multipart/form-data"
              >
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {errorMessage}
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Ad Soyad */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-[#af8107] outline-none transition-colors placeholder:text-gray-400 text-gray-800 font-medium"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      E-posta *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-[#af8107] outline-none transition-colors placeholder:text-gray-400 text-gray-800 font-medium"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Telefon */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                      Telefon *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-[#af8107] outline-none transition-colors placeholder:text-gray-400 text-gray-800 font-medium"
                        placeholder="05XX XXX XX XX"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Pozisyon */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="position">
                      Başvurulan Pozisyon *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-[#af8107] outline-none transition-colors placeholder:text-gray-400 text-gray-800 font-medium"
                      placeholder="Pozisyon Adı"
                      required
                      readOnly={!!searchParams.get('position')}
                    />
                    {!!searchParams.get('position') && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="inline-flex items-center">
                          <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Bu alan otomatik doldurulmuştur.
                        </span>
                      </p>
                    )}
                  </div>
                  
                  {/* CV Yükleme */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="cv">
                      CV Yükle (PDF) *
                    </label>
                    <div className="relative">
                      <div className="flex items-center space-x-4">
                        <label className="flex-1 flex items-center px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                          <FaFileAlt className="text-gray-400 mr-3" />
                          <span className="text-gray-600 font-medium">
                            {formData.cv ? formData.cv.name : "PDF dosyası seçin"}
                          </span>
                          <input
                            type="file"
                            id="cv"
                            name="cv"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="hidden"
                            required
                          />
                        </label>
                        {formData.cv && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, cv: null }))}
                            className="px-3 py-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            Kaldır
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sadece PDF formatı kabul edilmektedir.
                      </p>
                    </div>
                  </div>
                  
                  {/* Mesaj (opsiyonel) */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                      Ek Mesaj (Opsiyonel)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-[#af8107] outline-none transition-colors resize-none placeholder:text-gray-400 text-gray-800 font-medium"
                      placeholder="Eklemek istediğiniz bilgiler..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 flex justify-center items-center text-white font-medium rounded-lg ${
                        isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-[#af8107] hover:bg-[#8f6c06]'
                      } transition-colors`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></span>
                          Gönderiliyor...
                        </>
                      ) : (
                        'Başvuruyu Gönder'
                      )}
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                      * işaretli alanlar zorunludur.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
} 