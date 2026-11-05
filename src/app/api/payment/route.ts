import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, totalAmount, lang } = body;

    const apiKey = process.env.SHOPIER_API_KEY;
    const apiSecret = process.env.SHOPIER_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: 'بوابات الدفع غير مفعلة حالياً.' }, { status: 500 });
    }

    // 1. توليد رقم طلب فريد
    const orderId = `ORD-${Date.now()}`;
    const amount = totalAmount.toString();
    const currency = '0'; // 0 تعني ليرة تركية (TL) في Shopier

    // 2. التشفير (Hashing) حسب خوارزمية Shopier الآمنة
    const randomNr = Math.floor(Math.random() * 1000000).toString();
    const signatureString = randomNr + orderId + amount + currency;
    const signature = crypto.createHmac('sha256', apiSecret).update(signatureString).digest('base64');

    // 3. بناء فورم الدفع المخفي الذي سينقل العميل
    const htmlForm = `
      <!doctype html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>جارٍ التحويل للدفع...</title></head>
      <body>
        <form id="shopier_form" method="post" action="https://www.shopier.com/ShowProduct/api_pay4.php">
          <input type="hidden" name="API_key" value="${apiKey}">
          <input type="hidden" name="website_index" value="1">
          <input type="hidden" name="platform_order_id" value="${orderId}">
          <input type="hidden" name="product_name" value="طلب من PawHub Turkey">
          <input type="hidden" name="product_type" value="1"> <!-- 1 = Physical Product -->
          <input type="hidden" name="buyer_name" value="${formData.firstName}">
          <input type="hidden" name="buyer_surname" value="${formData.lastName}">
          <input type="hidden" name="buyer_email" value="${formData.email}">
          <input type="hidden" name="buyer_account_age" value="0">
          <input type="hidden" name="buyer_id_nr" value="0">
          <input type="hidden" name="buyer_phone" value="${formData.phone}">
          <input type="hidden" name="billing_address" value="${formData.address}">
          <input type="hidden" name="billing_city" value="${formData.city}">
          <input type="hidden" name="billing_country" value="TR">
          <input type="hidden" name="billing_postcode" value="16000">
          <input type="hidden" name="shipping_address" value="${formData.address}">
          <input type="hidden" name="shipping_city" value="${formData.city}">
          <input type="hidden" name="shipping_country" value="TR">
          <input type="hidden" name="shipping_postcode" value="16000">
          <input type="hidden" name="total_order_value" value="${amount}">
          <input type="hidden" name="currency" value="${currency}">
          <input type="hidden" name="return_url" value="http://localhost:3000/${lang}/success">
          <input type="hidden" name="cancel_url" value="http://localhost:3000/${lang}/checkout">
          <input type="hidden" name="signature" value="${signature}">
          <input type="hidden" name="return_url" value="http://localhost:3000/${lang}/success">
          <input type="hidden" name="random_nr" value="${randomNr}">
        </form>
        <script>
          document.getElementById('shopier_form').submit();
        </script>
      </body>
      </html>
    `;

    return new NextResponse(htmlForm, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Payment Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في معالجة الدفع' }, { status: 500 });
  }
}