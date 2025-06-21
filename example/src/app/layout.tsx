'use client';
import './globals.css';
import '@mantine/core/styles.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import {
  NextNavigationProgressBar,
  NextNavigationProgressProvider,
  NavigationLink,
} from 'next-navigation-progress';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <NextNavigationProgressProvider>
            <nav className="flex items-center justify-between bg-gray-900 text-white p-4 relative">
              <div className="flex items-center gap-6">
                <NavigationLink
                  href="/"
                  className="text-lg font-semibold hover:text-blue-400 transition-colors"
                >
                  next-navigation-progress
                </NavigationLink>
                <div className="flex gap-4">
                  <NavigationLink
                    href="/"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </NavigationLink>
                  <NavigationLink
                    href="/profile"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Profile
                  </NavigationLink>
                  <NavigationLink
                    href="/detail"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Detail
                  </NavigationLink>
                </div>
              </div>
              <a
                href="https://github.com/thu-san/next-navigation-progress"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
              <div className="absolute right-0 top-0 w-full">
                <NextNavigationProgressBar />
              </div>
            </nav>
            <main className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto p-6">{children}</div>
            </main>
          </NextNavigationProgressProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
