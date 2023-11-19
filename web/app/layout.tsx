import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'shop savvy!',
  description: "Savvy aggregates the data of e-commerce retailers (currently only Walmart but others can be easily added as well), and produces a list sorted by how relevant they are to the shopper's query. For each option, a Savvy Score is given, along with insights about why it should be relevant to the shopper",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
        </body>
    </html>
  )
}
