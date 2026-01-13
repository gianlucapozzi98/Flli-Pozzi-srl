'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Cookies() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading">
              {t('cookies.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t('cookies.subtitle')}
            </p>
          </div>
        </section>

        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8" style={{ maxWidth: '1200px' }}>
            <div className="prose prose-lg max-w-none text-text-light leading-relaxed mx-auto">
              <div className="text-center">
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.intro')}
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.whatAre')}
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.storage')}
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.browserSettings')} <a href="http://www.allaboutcookies.org" target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">http://www.allaboutcookies.org</a>.
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.necessary')}
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.disabling')}
                </p>
                
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('cookies.thirdParty')}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.howUse')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.howUse.text1')}
              </p>
              
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.howUse.text2')}
              </p>

              <h3 className="text-2xl font-semibold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.navigation.title')}</h3>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.navigation.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.navigation.text2')}
              </p>

              <h3 className="text-2xl font-semibold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.session.title')}</h3>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.session.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.session.text2')}
              </p>

              <h3 className="text-2xl font-semibold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.analytics.title')}</h3>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text2')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text3')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text4')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text5')} <a href="http://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">http://tools.google.com/dlpage/gaoptout?hl=en</a>
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.analytics.text6')} <a href="https://www.google.com/analytics/learn/privacy.html?hl=it" target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">https://www.google.com/analytics/learn/privacy.html?hl=it</a>
              </p>

              <h3 className="text-2xl font-semibold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.profiling.title')}</h3>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.profiling.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.profiling.text2')}
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '900px', marginTop: '2rem', marginBottom: '2rem' }}>
                <p>
                  {t('cookies.sharing.text1')}
                </p>
                <p className="mt-4">
                  {t('cookies.sharing.text2')}
                </p>
                <p className="mt-4">
                  {t('cookies.sharing.text3')}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.duration.title')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.duration.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.duration.text2')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.duration.text3')}
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('cookies.changes.title')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('cookies.changes.text')}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '800px', marginTop: '2rem', marginBottom: '2rem' }}>
                <p>
                  <strong>{t('cookies.dataController')}</strong> {t('cookies.dataController.value')}
                </p>
                <p className="mt-4">
                  {t('cookies.moreInfo')} <a href="http://www.allaboutcookies.org" target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">http://www.allaboutcookies.org</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
