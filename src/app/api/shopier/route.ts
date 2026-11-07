import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Shopier يرسل البيانات بصيغة Form Data
    const formData = await request.formData();
    
    const status = formData.get('status') as string;
    const order_id = formData.get('order_id') as string;
    const random_nr = formData.get('random_nr') as string;
    const signature = formData.get('signature') as string;

    const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET || '';

    // 1. إعادة إنشاء التوقيع للتحقق منه (خوارزمية شوبير: random_nr + order_id)
    const expectedData = random_nr + order_id;
    const expectedSignature = crypto
      .createHmac('sha256', SHOPIER_API_SECRET)
      .update(expectedData)
      .digest('base64');

    // 2. التحقق من أمان العملية (لمنع عمليات الاحتيال)
    if (signature !== expectedSignature) {
      console.error('Invalid signature from Shopier');
      // توجيه لصفحة السلة مع رسالة خطأ
      return NextResponse.redirect(new URL('/ar/cart?error=invalid_signature', request.url));
    }

    // 3. التحقق من نجاح الدفع
    if (status === 'success') {
      // توجيه العميل لصفحة النجاح مع رقم الطلب
      return NextResponse.redirect(new URL(`/ar/payment-success?orderId=${order_id}`, request.url));
    } else {
      // توجيه العميل للسلة في حال فشل الدفع أو تم رفض البطاقة
      return NextResponse.redirect(new URL('/ar/cart?error=payment_failed', request.url));
    }

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/ar/cart?error=server_error', request.url));
  }
}