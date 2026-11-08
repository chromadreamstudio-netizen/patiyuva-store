import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// اللغات المدعومة
const locales = ['tr', 'ar', 'en']
// اللغة الافتراضية
const defaultLocale = 'tr'

// دالة لمعرفة لغة متصفح الزائر (بسيطة حالياً)
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    if (acceptLanguage.includes('ar')) return 'ar'
    if (acceptLanguage.includes('en')) return 'en'
  }
  return defaultLocale
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // استثناء الملفات الثابتة والصور ومسارات API ومسار Admin من أي تحويل للغة
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }

  // التحقق مما إذا كان الرابط يحتوي بالفعل على لغة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // إذا لم يكن الرابط يحتوي على لغة، أعد التوجيه إلى اللغة المناسبة
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // تفعيل الميدل وير على كل المسارات ما عدا المحددة (تمت إضافة admin هنا كطبقة حماية إضافية)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin).*)'],
}