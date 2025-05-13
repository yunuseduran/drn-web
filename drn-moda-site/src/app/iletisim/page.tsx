'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });
    
    // Burada gerçek bir form gönderimi simüle ediliyor
    // Gerçek bir API entegrasyonu yapılabilir
    try {
      // Yapay form gönderim gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      
      // Form başarıyla gönderildi
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
      });
      
      // Formu sıfırla
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: true,
        message: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      });
    }
  };

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">İletişim</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bize ulaşın.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Info + Form Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaMapMarkerAlt className="text-[#af8107] text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Adres</h3>
                      <p className="text-gray-600">
                        Organize Sanayi Bölgesi, <br />
                        34555 Tekstil Caddesi No: 123, <br />
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaPhone className="text-[#af8107] text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Telefon</h3>
                      <p className="text-gray-600">+90 (212) 555 6789</p>
                      <p className="text-gray-600">+90 (212) 555 9876</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaEnvelope className="text-[#af8107] text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">E-posta</h3>
                      <p className="text-gray-600">info@drnmoda.com</p>
                      <p className="text-gray-600">satis@drnmoda.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FaClock className="text-[#af8107] text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">Çalışma Saatleri</h3>
                      <p className="text-gray-600">Pazartesi - Cuma: 9:00 - 18:00</p>
                      <p className="text-gray-600">Cumartesi: 9:00 - 13:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Bizi Takip Edin</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-[#af8107] transition-colors">
                      <FaFacebook className="text-2xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#af8107] transition-colors">
                      <FaTwitter className="text-2xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#af8107] transition-colors">
                      <FaInstagram className="text-2xl" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-[#af8107] transition-colors">
                      <FaLinkedin className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Bize Ulaşın</h2>
                
                {formStatus.isSubmitted && (
                  <div className={`p-4 mb-6 rounded-lg ${formStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Adınız Soyadınız</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-transparent outline-none transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-posta Adresiniz</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-transparent outline-none transition-colors"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefon Numaranız</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-transparent outline-none transition-colors"
                        placeholder="0555 123 4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Konu</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-transparent outline-none transition-colors bg-white"
                      >
                        <option value="">Konu Seçiniz</option>
                        <option value="Genel Bilgi">Genel Bilgi</option>
                        <option value="Ürün Bilgisi">Ürün Bilgisi</option>
                        <option value="Sipariş">Sipariş</option>
                        <option value="İş Birliği">İş Birliği</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mesajınız</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#af8107] focus:border-transparent outline-none transition-colors"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`px-6 py-3 bg-[#af8107] hover:bg-[#8d6903] text-white font-medium rounded-lg transition-colors ${
                        formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {formStatus.isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gönderiliyor...
                        </span>
                      ) : 'Mesajı Gönder'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-6 overflow-hidden"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Konum</h2>
            
            <div className="h-[450px] w-full rounded-lg overflow-hidden">
              {/* Tavsiye: Buraya gerçek bir Google Maps embedı eklenebilir */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.430502642051!2d28.83494196966874!3d41.03133740987252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa54e5d7c1b7b%3A0xf5127aefd5e58f82!2seda%20tekstil%20(drn)!5e0!3m2!1str!2str!4v1746620216945!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sıkça Sorulan Sorular</h2>
            <div className="h-1 w-24 bg-[#af8107] mx-auto"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            {[
              {
                question: "Sipariş vermek için nasıl iletişime geçebilirim?",
                answer: "Sipariş vermek için iletişim formundan 'Sipariş' konusunu seçerek bize ulaşabilir veya doğrudan telefon numaralarımızdan bizi arayabilirsiniz. Satış ekibimiz en kısa sürede size dönüş yapacaktır."
              },
              {
                question: "Minimum sipariş adedi var mı?",
                answer: "Evet, ürün kategorilerine göre değişen minimum sipariş adetlerimiz bulunmaktadır. Bu konuda detaylı bilgi için satış ekibimizle iletişime geçmenizi rica ederiz."
              },
              {
                question: "Yurt dışına sevkiyat yapıyor musunuz?",
                answer: "Evet, dünyanın pek çok ülkesine sevkiyat yapıyoruz. Uluslararası lojistik ağımız sayesinde siparişlerinizi güvenle istediğiniz noktaya ulaştırabiliyoruz."
              },
              {
                question: "Ürünlerinizin numunelerini görebilir miyim?",
                answer: "Elbette, potansiyel müşterilerimiz için ürün numuneleri sağlıyoruz. Numune talebinizi iletişim formundan veya telefon yoluyla iletebilirsiniz."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
} 