import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // <-- تم استدعاء مكون السكربت من Next.js
import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDictionary } from "../../lib/dictionaries"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={dir} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {/* النافبار الآن يعمل في كل الصفحات بشكل عالمي */}
        <Navbar lang={lang} />
        
        {props.children}
        
        <Footer dict={dict} lang={lang} />

        {/* --- كود Meta Pixel --- */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1161543019672767');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}