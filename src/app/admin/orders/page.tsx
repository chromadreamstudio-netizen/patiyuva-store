'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// تهيئة الاتصال بقاعدة بيانات Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب الطلبات عند تحميل الصفحة
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false }); // ترتيب من الأحدث للأقدم

      if (error) throw error;
      if (data) setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // دالة لتغيير حالة الطلب (مثلاً: من معلق إلى تم الدفع)
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      // تحديث القائمة بعد التغيير
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('حدث خطأ أثناء تحديث حالة الطلب');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xl font-bold">جاري تحميل الطلبات...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">📦 إدارة الطلبات (Patiyuva)</h1>
          <button onClick={fetchOrders} className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg font-bold transition">
            🔄 تحديث
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">العميل</th>
                  <th className="px-6 py-4">العنوان والهاتف</th>
                  <th className="px-6 py-4">المنتجات المطلوبة</th>
                  <th className="px-6 py-4">الإجمالي</th>
                  <th className="px-6 py-4 text-center">الحالة (Status)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-medium">لا توجد طلبات حتى الآن</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {new Date(order.created_at).toLocaleDateString('ar-EG')} <br />
                        <span className="text-xs text-slate-400">{new Date(order.created_at).toLocaleTimeString('ar-EG')}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {order.customer_name} <br />
                        <span className="text-xs text-slate-500 font-normal">{order.customer_email}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        <div className="font-bold text-indigo-600 mb-1" dir="ltr">{order.customer_phone}</div>
                        <div className="text-xs max-w-xs leading-relaxed">{order.shipping_address}</div>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="text-xs text-slate-600 space-y-1">
                          {order.order_items?.map((item: any, idx: number) => (
                            <li key={idx} className="line-clamp-1">
                              • {item.name} <span className="font-bold">(x{item.quantity})</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 font-black text-emerald-600 whitespace-nowrap">
                        {order.total_amount} TL
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-sm font-bold px-3 py-1.5 rounded-lg border-2 outline-none cursor-pointer ${
                            order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            order.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          <option value="pending">⏳ بانتظار الدفع</option>
                          <option value="paid">✅ تم الدفع</option>
                          <option value="shipped">🚚 تم الشحن</option>
                          <option value="cancelled">❌ ملغي</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}