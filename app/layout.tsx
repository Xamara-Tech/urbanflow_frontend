import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Chatbot } from '@/components/chat/chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kilimani Urban Intelligence Platform',
  description: 'Data-driven urban development for sustainable communities in Kilimani',
  keywords: ['urban planning', 'Kilimani', 'Nairobi', 'sustainable development', 'smart city'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Chatbot context={{ type: 'general' }} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}