import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', weight: ['300', '400', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Carbon Edge | The New Grid',
  description: 'Leading Nigeria\'s transition to sustainable energy with premium solar infrastructure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}