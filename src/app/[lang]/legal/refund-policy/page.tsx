export default async function RefundPolicy(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {isAr ? 'سياسة الإلغاء والاسترجاع' : lang === 'en' ? 'Refund Policy' : 'İptal ve İade Koşulları'}
      </h1>
      <div className="prose text-gray-600 space-y-4">
        <p><strong>Cayma Hakkı:</strong> ALICI, satın aldığı ürünü teslim tarihinden itibaren 14 (on dört) gün içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin iade etme hakkına sahiptir.</p>
        <p><strong>İade Şartları:</strong> İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir. Evcil hayvan ürünlerinde hijyen kuralları gereği, kullanılmış veya yıkanmış ürünler iade alınmamaktadır.</p>
        <p><strong>İptal Süreci:</strong> Siparişiniz kargoya verilmeden önce destek@patiyuva.com adresi üzerinden iptal talebinde bulunabilirsiniz.</p>
      </div>
    </div>
  );
}