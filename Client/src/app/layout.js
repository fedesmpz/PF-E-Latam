'use client'
import Providers from "../redux/provider/Provider"
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
              <title>e-Latam</title>
              <body>
                <Providers>
                  {children}
                </Providers>
              </body>
            </html>
  )
}