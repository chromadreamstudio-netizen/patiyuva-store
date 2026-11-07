export default async function PrivacyPolicy(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {isAr ? 'سياسة الخصوصية' : lang === 'en' ? 'Privacy Policy' : 'Gizlilik ve KVKK Politikası'}
      </h1>
      <div className="prose text-gray-600 space-y-4">
        <p><strong>Kişisel Verilerin Korunması:</strong> Patiyuva olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, müşterilerimize ait kişisel verilerin gizliliğine ve güvenliğine en üst düzeyde önem vermekteyiz.</p>
        <p><strong>Veri Kullanımı:</strong> Alışveriş sırasında paylaştığınız ad, soyad, adres, telefon ve e-posta gibi bilgiler sadece siparişinizin teslimatı ve size daha iyi hizmet sunabilmek amacıyla kullanılmaktadır.</p>
        <p><strong>Ödeme Güvenliği:</strong> Kredi kartı bilgileriniz sistemlerimizde kesinlikle saklanmamakta olup, ödeme işlemleri iyzico güvencesiyle 256-Bit SSL şifreleme ile doğrudan bankaya iletilmektedir.</p>
      </div>
    </div>
  );
}