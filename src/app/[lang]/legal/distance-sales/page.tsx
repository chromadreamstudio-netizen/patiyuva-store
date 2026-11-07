export default async function DistanceSales(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {isAr ? 'عقد البيع عن بُعد' : lang === 'en' ? 'Distance Sales Agreement' : 'Mesafeli Satış Sözleşmesi'}
      </h1>
      <div className="prose text-gray-600 space-y-4">
        <p><strong>Madde 1 - Taraflar:</strong> Bu sözleşme, bir tarafta Patiyuva (bundan sonra SATICI olarak anılacaktır) ile diğer tarafta ürünü satın alan kişi (bundan sonra ALICI olarak anılacaktır) arasında akdedilmiştir.</p>
        <p><strong>Madde 2 - Konu:</strong> İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
        <p><strong>Madde 3 - Teslimat:</strong> Ürünler, sipariş onayından itibaren yasal 30 günlük süreyi aşmamak koşulu ile ALICI'nın gösterdiği adrese teslim edilir.</p>
        <p><em>(Not: Bu metin standart e-ticaret kurallarına göre düzenlenmiştir ve Patiyuva tarafından garanti altına alınmıştır.)</em></p>
      </div>
    </div>
  );
}