import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Dashboard | Patiyuva',
  description: 'Store Management Panel',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}