'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading">
              {t('privacy.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t('privacy.subtitle')}
            </p>
          </div>
        </section>

        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8" style={{ maxWidth: '1200px' }}>
            <div className="prose prose-lg max-w-none text-text-light leading-relaxed mx-auto">
              <div className="text-center">
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('privacy.intro1')}
              </p>
              
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('privacy.intro2')}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.whatInfoTitle')}</h2>
              <ul className="list-disc pl-8 mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <li>
                  <strong>{t('privacy.contactData')}:</strong> {t('privacy.contactData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.financialData')}:</strong> {t('privacy.financialData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.transactionData')}:</strong> {t('privacy.transactionData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.profileData')}:</strong> {t('privacy.profileData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.specialData')}:</strong> {t('privacy.specialData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.marketingData')}:</strong> {t('privacy.marketingData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.usageData')}:</strong> {t('privacy.usageData.desc')};
                </li>
                <li>
                  <strong>{t('privacy.technicalData')}:</strong> {t('privacy.technicalData.desc')}.
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.howUseTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.howUse.text1')}
              </p>

              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.howUse.text2')}
              </p>

              <div className="overflow-x-auto mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-text">{t('privacy.table.purpose')}</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-text">{t('privacy.table.legalBasis')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <p>{t('privacy.table.purpose1')}</p>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">{t('privacy.table.legalBasis1')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <p>{t('privacy.table.purpose2')}</p>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {t('privacy.table.legalBasis2')}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <p>{t('privacy.table.purpose3')}</p>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {t('privacy.table.legalBasis2')}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        {t('privacy.table.purpose4')}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {t('privacy.table.legalBasis4')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.howShareTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.howShare.text')}
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.transferTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.transfer.text')}
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.retentionTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.retention.text1')}
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.retention.text2')}
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.rightsTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>{t('privacy.rights.intro')}</p>
              <ul className="list-disc pl-8 mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <li>{t('privacy.rights.copy')};</li>
                <li>{t('privacy.rights.correct')};</li>
                <li>{t('privacy.rights.withdraw')};</li>
                <li>{t('privacy.rights.oppose')};</li>
                <li>{t('privacy.rights.portability')};</li>
                <li>{t('privacy.rights.complaint')}.</li>
              </ul>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.contactsTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.contacts.text')}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '500px', marginTop: '2rem', marginBottom: '2rem' }}>
                <p className="mb-2">
                  <strong>{t('privacy.contacts.post')}:</strong> via Leonardo Da Vinci, 37 Caravaggio, 24043 - (BG)
              </p>
              <p>
                  <strong>{t('privacy.contacts.email')}:</strong> <a href="mailto:fllipozzi@fllipozzi.it" className="text-primary hover:underline">fllipozzi@fllipozzi.it</a>
              </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>{t('privacy.changesTitle')}</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                {t('privacy.changes.text')}
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '800px', marginTop: '2rem', marginBottom: '2rem' }}>
              <p>
                  <strong>{t('privacy.dataController')}:</strong> {t('privacy.dataController.value')}
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
