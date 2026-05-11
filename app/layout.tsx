import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-heading'
});
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body'
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Carbon Edge | The New Grid',
  description: 'Autonomous renewable energy for West Africa luxury estates.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} ${mono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}