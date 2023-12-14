import {Inter} from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import {Theme} from '@radix-ui/themes';
import {ThemeProvider} from '../components/theme-provider';
import NavBar from '../components/NavBar';

const inter = Inter({subsets: ['latin']});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Theme appearance="light" accentColor="orange" grayColor="slate" radius="full">
            <NavBar />
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
