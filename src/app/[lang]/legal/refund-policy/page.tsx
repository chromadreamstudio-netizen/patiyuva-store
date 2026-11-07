import Link from 'next/link';

export default async function RefundPolicy(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  const content = {
    ar: { title: 'سياسة الإلغاء والاسترجاع', back: 'العودة للرئيسية', p1: 'حق التراجع: يحق للمشتري إرجاع المنتج خلال 14 يوماً من الاستلام بدون إبداء أسباب.', p2: 'شروط الإرجاع: يجب أن يكون المنتج بحالته الأصلية وغلافه. لظروف صحية، لا نقبل استرجاع المنتجات المستخدمة.', p3: 'الإلغاء: يمكنك إلغاء الطلب قبل الشحن عبر مراسلتنا.' },
    tr: { title: 'İptal ve İade Koşulları', back: 'Ana Sayfaya Dön', p1: 'Cayma Hakkı: ALICI, ürünü 14 gün içinde şartsız iade edebilir.', p2: 'İade Şartları: Ürünler kullanılmamış ve ambalajlı olmalıdır. Hijyen sebebiyle kullanılmış ürünler iade alınmaz.', p3: 'İptal: Kargoya verilmeden önce iptal edebilirsiniz.' },
    en: { title: 'Refund Policy', back: 'Back to Home', p1: 'Right of Withdrawal: Returns accepted within 14 days of delivery.', p2: 'Conditions: Items must be unused and in original packaging. Used items cannot be returned due to hygiene.', p3: 'Cancellation: Orders can be cancelled before shipping.' }
  };
  const t = content[lang as keyof typeof content] || content.ar;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <Link href={`/${lang}`} className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
         {isAr ? '← ' : '→ '} {t.back}
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.title}</h1>
      <div className="prose text-gray-600 space-y-4">
        <p>{t.p1}</p><p>{t.p2}</p><p>{t.p3}</p>
      </div>
    </div>
  );
}