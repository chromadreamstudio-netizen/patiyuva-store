import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerData, cartItems, totalPrice } = body;

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerData.fullName,
          customer_phone: customerData.phone,
          customer_email: customerData.email,
          shipping_address: `${customerData.city} - ${customerData.address}`,
          total_amount: totalPrice,
          status: 'pending',
          payment_method: 'shopier_link',
          order_items: cartItems
        }
      ])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, orderId: data[0].id });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false, error: 'Failed to save order' }, { status: 500 });
  }
}