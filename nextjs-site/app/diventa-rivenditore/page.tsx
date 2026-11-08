'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

type B2BFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  companyWebsite?: string;
  activityType: string;
  productsInterest: string;
  quantities?: string;
  message: string;
  /** Honeypot */
  website?: string;
};

const categories = [
  {
    href: '/prodotti#reggiatrici',
    image: '/Immagini/tendireggia-manuale-cp2000.png',
    titleKey: 'rivenditore.products.manuali.title',
    descKey: 'rivenditore.products.manuali.desc',
  },
  {
    href: '/prodotti#reggiatrici',
    image: '/Immagini/reggiatrice-a-batteria-gt-one.png',
    titleKey: 'rivenditore.products.batteria.title',
    descKey: 'rivenditore.products.batteria.desc',
  },
  {
    href: '/prodotti#reggiatrici',
    image: '/Immagini/reggiatrice-pneumatica-acciaio-fp-13-16-19.png',
    titleKey: 'rivenditore.products.pneumatiche.title',
    descKey: 'rivenditore.products.pneumatiche.desc',
  },
  {
    href: '/prodotti#accessori',
    image: '/Immagini/angolari-in-plastica-per-reggia.png',
    titleKey: 'rivenditore.products.accessori.title',
    descKey: 'rivenditore.products.accessori.desc',
  },
] as const;

const steps = [
  'rivenditore.steps.1',
  'rivenditore.steps.2',
  'rivenditore.steps.3',
  'rivenditore.steps.4',
] as const;

const benefits = [
  'rivenditore.benefits.1',
  'rivenditore.benefits.2',
  'rivenditore.benefits.3',
  'rivenditore.benefits.4',
  'rivenditore.benefits.5',
] as const;

export default function DiventaRivenditore() {
  const { t } = useLanguage();
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const schema = z.object({
    name: z.string().min(2, t('contatti.form.error.name')),
    company: z.string().min(2, t('rivenditore.form.error.company')),
    email: z.string().email(t('contatti.form.error.email')),
    phone: z.string().min(1, t('contatti.form.error.phone')),
    country: z.string().min(2, t('rivenditore.form.error.country')),
    companyWebsite: z.string().optional(),
    activityType: z.string().min(2, t('rivenditore.form.error.activity')),
    productsInterest: z.string().min(2, t('rivenditore.form.error.products')),
    quantities: z.string().optional(),
    message: z.string().min(10, t('contatti.form.error.message')),
    website: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<B2BFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      website: '',
      message: '',
      phone: '',
      companyWebsite: '',
      quantities: '',
    },
  });

  useEffect(() => {
    setValue('message', t('rivenditore.form.prefill'), { shouldValidate: false });
  }, [t, setValue]);

  const onSubmit = async (data: B2BFormData) => {
    setSubmitError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          website: data.website || '',
          company: data.company,
          country: data.country,
          companyWebsite: data.companyWebsite || '',
          activityType: data.activityType,
          productsInterest: data.productsInterest,
          quantities: data.quantities || '',
          source: 'b2b',
        }),
      });

      let result: { error?: string } = {};
      try {
        result = await response.json();
      } catch {
        // ignore
      }

      if (!response.ok) {
        setSubmitError(result.error || t('contatti.form.error.submit'));
        return;
      }

      // Pagina di ringraziamento al posto dell'alert
      router.push('/grazie?tipo=b2b');
    } catch {
      setSubmitError(t('contatti.form.error.submit'));
    }
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors bg-white';

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-dark text-white">
          <div className="absolute inset-0">
            <Image
              src="/Immagini/stabilimento-fratelli-pozzi-caravaggio.png"
              alt="Flli Pozzi"
              fill
              className="object-cover opacity-40"
              priority
              style={{ objectPosition: 'left center' }}
            />
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div
            className="relative z-10 px-6 lg:px-8 flex flex-col items-center text-center"
            style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '100px', paddingBottom: '90px' }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-heading text-center"
              style={{ marginBottom: '1.25rem' }}
            >
              {t('rivenditore.hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full text-lg md:text-xl text-center text-white/90 leading-relaxed max-w-3xl mx-auto"
              style={{ marginBottom: '2rem' }}
            >
              {t('rivenditore.hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            >
              <a
                href="#richiesta-b2b"
                className="inline-block text-center bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md w-full sm:w-auto"
                style={{ padding: '0.9rem 1.75rem' }}
              >
                {t('rivenditore.hero.cta.primary')}
              </a>
              <a
                href="#richiesta-b2b"
                className="inline-block text-center border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
                style={{ padding: '0.9rem 1.75rem' }}
              >
                {t('rivenditore.hero.cta.secondary')}
              </a>
            </motion.div>
          </div>
        </section>

        <div className="text-content-area">
          {/* Presentazione */}
          <section className="bg-white" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
            <div className="px-6 lg:px-8" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                  <Image
                    src="/Immagini/fratelli-pozzi-foto-storica-1949.jpg"
                    alt="Flli Pozzi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading" style={{ marginBottom: '1rem' }}>
                    {t('rivenditore.about.title')}
                  </h2>
                  <div className="w-20 h-1 bg-primary" style={{ marginBottom: '1.5rem' }} />
                  <p className="text-text-light leading-relaxed text-lg" style={{ marginBottom: '1rem' }}>
                    {t('rivenditore.about.p1')}
                  </p>
                  <p className="text-text-light leading-relaxed text-lg" style={{ marginBottom: '1.5rem' }}>
                    {t('rivenditore.about.p2')}
                  </p>
                  <Link
                    href="/azienda"
                    className="text-primary font-semibold hover:underline"
                  >
                    {t('rivenditore.about.link')}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Gamma prodotti */}
          <section className="bg-bg-light" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
            <div className="px-6 lg:px-8" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center" style={{ marginBottom: '1rem' }}>
                {t('rivenditore.products.title')}
              </h2>
              <div className="w-20 h-1 bg-primary" style={{ marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }} />
              <div className="flex justify-center" style={{ marginBottom: '2.5rem' }}>
                <p className="text-text-light text-center leading-relaxed" style={{ maxWidth: '42rem', width: '100%' }}>
                  {t('rivenditore.products.intro')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat, index) => (
                  <Link
                    key={cat.titleKey}
                    href={cat.href}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={cat.image}
                        alt={t(cat.titleKey)}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold font-heading text-base mb-2 text-text group-hover:text-primary transition-colors">
                        {t(cat.titleKey)}
                      </h3>
                      <p className="text-sm text-text-light leading-relaxed">{t(cat.descKey)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center" style={{ marginTop: '2rem' }}>
                <Link
                  href="/prodotti"
                  className="inline-block border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  {t('rivenditore.products.cta')}
                </Link>
              </div>
            </div>
          </section>

          {/* Collaborazione B2B */}
          <section className="bg-white" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
            <div className="px-6 lg:px-8" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center" style={{ marginBottom: '1rem' }}>
                {t('rivenditore.benefits.title')}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" style={{ marginBottom: '1.5rem' }} />
              <p className="text-text-light text-center leading-relaxed" style={{ marginBottom: '2rem' }}>
                {t('rivenditore.benefits.intro')}
              </p>
              <ul className="space-y-4">
                {benefits.map((key) => (
                  <li
                    key={key}
                    className="flex gap-3 items-start bg-bg-light rounded-lg"
                    style={{ padding: '1rem 1.25rem' }}
                  >
                    <span className="text-primary font-bold mt-0.5" aria-hidden="true">
                      ›
                    </span>
                    <span className="text-text-light leading-relaxed">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Come funziona */}
          <section className="bg-bg-light" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
            <div className="px-6 lg:px-8" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center" style={{ marginBottom: '1rem' }}>
                {t('rivenditore.steps.title')}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" style={{ marginBottom: '2.5rem' }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((key, index) => (
                  <div
                    key={key}
                    className="bg-white rounded-lg shadow-md text-center"
                    style={{ padding: '1.75rem 1.25rem' }}
                  >
                    <div
                      className="mx-auto flex items-center justify-center rounded-full bg-primary text-white font-bold font-heading"
                      style={{ width: '48px', height: '48px', marginBottom: '1rem' }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-text-light leading-relaxed">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Form B2B */}
          <section
            id="richiesta-b2b"
            className="bg-white"
            style={{ paddingTop: '70px', paddingBottom: '80px', scrollMarginTop: '100px' }}
          >
            <div className="px-6 lg:px-8" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-center" style={{ marginBottom: '1rem' }}>
                {t('rivenditore.form.title')}
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" style={{ marginBottom: '1rem' }} />
              <p className="text-text-light text-center leading-relaxed" style={{ marginBottom: '2rem' }}>
                {t('rivenditore.form.intro')}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-10000px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                  }}
                >
                  <label htmlFor="website-hp">Website</label>
                  <input {...register('website')} type="text" id="website-hp" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="b2b-name" className="block font-medium mb-2">
                      {t('rivenditore.form.name')} *
                    </label>
                    <input {...register('name')} id="b2b-name" type="text" className={inputClass} />
                    {errors.name && <p className="text-primary text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="b2b-company" className="block font-medium mb-2">
                      {t('rivenditore.form.company')} *
                    </label>
                    <input {...register('company')} id="b2b-company" type="text" className={inputClass} />
                    {errors.company && <p className="text-primary text-sm mt-1">{errors.company.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="b2b-email" className="block font-medium mb-2">
                      {t('contatti.form.email')} *
                    </label>
                    <input {...register('email')} id="b2b-email" type="email" className={inputClass} />
                    {errors.email && <p className="text-primary text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="b2b-phone" className="block font-medium mb-2">
                      {t('rivenditore.form.phone')} *
                    </label>
                    <input {...register('phone')} id="b2b-phone" type="tel" className={inputClass} />
                    {errors.phone && <p className="text-primary text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="b2b-country" className="block font-medium mb-2">
                      {t('rivenditore.form.country')} *
                    </label>
                    <input {...register('country')} id="b2b-country" type="text" className={inputClass} />
                    {errors.country && <p className="text-primary text-sm mt-1">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="b2b-site" className="block font-medium mb-2">
                      {t('rivenditore.form.companyWebsite')}
                    </label>
                    <input {...register('companyWebsite')} id="b2b-site" type="url" className={inputClass} placeholder="https://" />
                  </div>
                </div>

                <div>
                  <label htmlFor="b2b-activity" className="block font-medium mb-2">
                    {t('rivenditore.form.activity')} *
                  </label>
                  <select {...register('activityType')} id="b2b-activity" className={inputClass}>
                    <option value="">{t('rivenditore.form.activity.placeholder')}</option>
                    <option value={t('rivenditore.form.activity.packaging')}>{t('rivenditore.form.activity.packaging')}</option>
                    <option value={t('rivenditore.form.activity.wholesale')}>{t('rivenditore.form.activity.wholesale')}</option>
                    <option value={t('rivenditore.form.activity.reseller')}>{t('rivenditore.form.activity.reseller')}</option>
                    <option value={t('rivenditore.form.activity.produce')}>{t('rivenditore.form.activity.produce')}</option>
                    <option value={t('rivenditore.form.activity.machinery')}>{t('rivenditore.form.activity.machinery')}</option>
                    <option value={t('rivenditore.form.activity.tools')}>{t('rivenditore.form.activity.tools')}</option>
                    <option value={t('rivenditore.form.activity.other')}>{t('rivenditore.form.activity.other')}</option>
                  </select>
                  {errors.activityType && (
                    <p className="text-primary text-sm mt-1">{errors.activityType.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="b2b-products" className="block font-medium mb-2">
                    {t('rivenditore.form.products')} *
                  </label>
                  <input {...register('productsInterest')} id="b2b-products" type="text" className={inputClass} />
                  {errors.productsInterest && (
                    <p className="text-primary text-sm mt-1">{errors.productsInterest.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="b2b-qty" className="block font-medium mb-2">
                    {t('rivenditore.form.quantities')}
                  </label>
                  <input {...register('quantities')} id="b2b-qty" type="text" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="b2b-message" className="block font-medium mb-2">
                    {t('contatti.form.message')} *
                  </label>
                  <textarea
                    {...register('message')}
                    id="b2b-message"
                    rows={6}
                    className={`${inputClass} resize-y`}
                  />
                  {errors.message && <p className="text-primary text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contatti.form.submitting') : t('rivenditore.form.submit')}
                </button>
                {submitError && (
                  <p role="alert" className="text-primary text-sm text-center font-medium">
                    {submitError}
                  </p>
                )}

                <p className="text-sm text-text-light text-center">
                  {t('rivenditore.form.note')}{' '}
                  <Link href="/contatti" className="text-primary hover:underline">
                    {t('nav.contacts')}
                  </Link>
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
