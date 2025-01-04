import { Montserrat } from 'next/font/google';
import "./globals.css";
import Header from './components/header/header';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Sphere Construction',
  description: 'Leaders in Quality Construction and Infrastructure',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-montserrat antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
