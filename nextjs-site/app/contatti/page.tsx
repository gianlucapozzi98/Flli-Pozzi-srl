'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function Contatti() {
  const { t } = useLanguage();
  
  const contactSchema = z.object({
    name: z.string().min(2, t('contatti.form.error.name')),
    email: z.string().email(t('contatti.form.error.email')),
    phone: z.string().min(1, t('contatti.form.error.phone')),
    message: z.string().min(10, t('contatti.form.error.message')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Mostra il messaggio di errore specifico dal server
        const errorMessage = result.error || t('contatti.form.error.submit');
        alert(errorMessage + (result.details ? `\n\nDettagli: ${result.details}` : ''));
        throw new Error(errorMessage);
      }

      alert(t('contatti.form.success'));
      reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      // Non mostrare di nuovo l'alert se è già stato mostrato sopra
      if (!error.message || !error.message.includes('Configurazione email')) {
        alert(t('contatti.form.error.submit'));
      }
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20" style={{ backgroundColor: '#EDEEF1', minHeight: '100vh' }}>
        {/* Contact Section */}
        <section className="py-20" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="px-8 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="flex justify-center" style={{ marginBottom: '60px' }}>
              <Image
                src="/Immagini/Logo Flli Pozzi 75.png"
                alt="Flli Pozzi 75° Anniversario"
                width={400}
                height={200}
                className="w-[300px] lg:w-auto h-auto"
                priority
              />
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2" style={{ gap: '78px' }}>
              {/* Contact Form - Prima su mobile */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="py-8 px-[3px] lg:px-8 mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none lg:w-full order-1 lg:order-2"
              >
                <h2 className="text-3xl font-bold font-heading" style={{ marginBottom: '15px' }}>
                  {t('contatti.form.title')}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-2">
                      {t('contatti.form.name')} *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.name && (
                      <p className="text-primary text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                      {t('contatti.form.email')} *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.email && (
                      <p className="text-primary text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-medium mb-2">
                      {t('contatti.form.phone.required')}
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-primary text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-medium mb-2">
                      {t('contatti.form.message')} *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-y"
                    />
                    {errors.message && (
                      <p className="text-primary text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('contatti.form.submitting') : t('contatti.form.submit')}
                  </button>
                </form>
              </motion.div>

              {/* Contact Info - Seconda su mobile */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none order-2 lg:order-1"
              >
                <h2 className="text-3xl font-bold font-heading" style={{ marginBottom: '40px' }}>
                  {t('contatti.title')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-text-light">
                      <span className="font-semibold text-primary">{t('contatti.address')}</span> {t('contatti.address.value')}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-light">
                      <span className="font-semibold text-primary">{t('contatti.phone')}</span>{' '}
                      <a href="tel:+390363350380" className="text-text-light hover:underline">
                        +39 0363 350380
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-text-light">
                      <span className="font-semibold text-primary">{t('contatti.email')}</span>{' '}
                      <a href="mailto:fllipozzi@fllipozzi.it" className="text-text-light hover:underline">
                        fllipozzi@fllipozzi.it
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4" style={{ marginTop: '40px', marginBottom: '40px' }}>
                  <a
                    href="https://www.linkedin.com/company/flli-pozzi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="#0077b5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/flli.pozzi.srl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#f09433', stopOpacity: 1 }} />
                          <stop offset="25%" style={{ stopColor: '#e6683c', stopOpacity: 1 }} />
                          <stop offset="50%" style={{ stopColor: '#dc2743', stopOpacity: 1 }} />
                          <stop offset="75%" style={{ stopColor: '#cc2366', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#bc1888', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                {/* Map su desktop - dentro info contatto */}
                <div className="hidden lg:block" style={{ marginTop: '40px' }}>
                  <iframe
                    src="https://www.google.com/maps?q=Via+Leonardo+da+Vinci+37,+Caravaggio+24043+BG,+Italy&output=embed"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa Flli Pozzi - Via Leonardo da Vinci 37, Caravaggio"
                  />
                </div>
              </motion.div>

              {/* Map - Terza su mobile, sotto il form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto lg:hidden max-w-[calc(100%-32px)] order-3"
                style={{ marginTop: '40px' }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Via+Leonardo+da+Vinci+37,+Caravaggio+24043+BG,+Italy&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa Flli Pozzi - Via Leonardo da Vinci 37, Caravaggio"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

