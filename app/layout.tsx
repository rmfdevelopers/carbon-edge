import { Space_Grotesk, Sora } from 'next/font/google';
import './globals.css';

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });
const body = Sora({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Carbon Edge — The New Grid',
  description: 'Redefining energy independence through high-precision solar arrays.',
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