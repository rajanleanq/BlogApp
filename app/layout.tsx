import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogApp - Share Your Stories',
  description: 'Create, edit, and share your blog posts with our beautiful platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Header />
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  );
}