import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import CustomCursor from '../components/CustomCursor';
import SmoothScroll from '../components/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'MM | Muhammad Muneeb — Full-Stack Developer',
  description: 'Creating digital experiences with Next.js, Tailwind, and Three.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body suppressHydrationWarning className="bg-background text-foreground overflow-x-hidden selection:bg-orange selection:text-white">
        {/* Custom Premium Elements */}
        <CustomCursor />
        <div className="noise-overlay" />

        <main className="relative z-10 w-full">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </main>
      </body>
    </html>
  );
}
