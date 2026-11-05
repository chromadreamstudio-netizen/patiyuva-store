import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "../../components/Footer";
import { getDictionary } from "../../lib/dictionaries"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Patiyuva",
  description: "Premium Pet Products",
};

export function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'ar' }, { lang: 'en' }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as 'tr' | 'ar' | 'en';
  const dir = lang === "ar" ? "rtl" : "ltr";
  
  // جلب القاموس بناءً على اللغة
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {props.children}
        {/* تمرير القاموس واللغة لمكون الفوتر ليتعامل مع الروابط بشكل صحيح */}
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}