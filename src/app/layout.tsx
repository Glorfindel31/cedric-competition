import './global.css';
import type {Metadata} from 'next';
import {Lato} from 'next/font/google';
import {ThemeProvider} from '@/context/theme-provider';
import NavBar from '@/components/NavBar';
import Footer from './components/Footer';
import {Toaster} from './components/ui/toaster';
import AuthProvider from './context/AuthProvider';

import {cn} from '@/lib/utils';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'KilterBoard Event Creator',
  description:
    'This is an open-source project where the admin will be able to create lists of problems on the Kilterboard',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col items-center w-full',
          lato.variable,
        )}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <NavBar />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
