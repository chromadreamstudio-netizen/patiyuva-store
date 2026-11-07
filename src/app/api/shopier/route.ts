import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { totalPrice, cartItems, customerData } = body;

    const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
    const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;

    if (!SHOPIER_API_KEY || !SHOPIER_API_SECRET) {
      console.error('Shopier keys are missing in environment variables');
      return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
    }

    // إنشاء رقم طلب فريد
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // تجهيز اسم المنتج (أول 50 حرف لتجنب أخطاء الطول)
    const productName = cartItems.map((item: any) => item.name).join(', ').substring(0, 50);
    const firstName = customerData.fullName.split(' ')[0] || 'Customer';
    const lastName = customerData.fullName.split(' ').slice(1).join(' ') || 'Name';

    // المعطيات الإجبارية التي تطلبها بوابة Shopier
    const args = {
      API_key: SHOPIER_API_KEY,
      website_index: 1,
      platform_order_id: orderId,
      product_name: productName || 'Patiyuva Order',
      product_type: 1, // 1 تعني منتج ملموس (فيزيائي)
      buyer_name: firstName,
      buyer_surname: lastName,
      buyer_email: customerData.email,
      buyer_account_age: 0,
      buyer_id_nr: 11111111111, // رقم افتراضي لتجاوز شرط الهوية
      buyer_phone: customerData.phone,
      billing_address: customerData.address,
      billing_city: customerData.city,
      billing_country: 'TR',
      billing_postcode: '16000',
      delivery_address: customerData.address,
      delivery_city: customerData.city,
      delivery_country: 'TR',
      delivery_postcode: '16000',
      total_order_value: totalPrice,
      currency: 0, // 0 تعني الليرة التركية
      return_url: 'https://patiyuva-store.vercel.app/api/shopier/callback',
      cancel_url: 'https://patiyuva-store.vercel.app/ar/cart',
    };

    // حساب التوقيع المشفر (Signature) لحماية الدفع
    const random_nr = Math.floor(Math.random() * 1000000).toString();
    const signatureString = random_nr + args.platform_order_id + args.total_order_value + args.currency;
    
    const signature = crypto
      .createHmac('sha256', SHOPIER_API_SECRET)
      .update(signatureString)
      .digest('base64');

    // تجميع البيانات لإعادتها للواجهة
    const formData = {
      ...args,
      signature: signature,
      random_nr: random_nr,
    };

    return NextResponse.json({
      success: true,
      paymentUrl: 'https://shopier.com/ShowProduct/api_pay4.php',
      formData: formData
    });

  } catch (error) {
    console.error('Shopier API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}