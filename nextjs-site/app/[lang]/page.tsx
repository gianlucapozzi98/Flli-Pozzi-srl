import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { pageMetadata } from '@/lib/seo';
import { DEFAULT_LANG, isLang } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata('home', '/', isLang(lang) ? lang : DEFAULT_LANG);
}

export default function Page() {
  return <HomePage />;
}
