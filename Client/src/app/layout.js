'use client'
import Providers from "../redux/provider/Provider"
import './globals.css'

export default function RootLayout({ children }) {
  return (
          <Providers>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
          </Providers>
  )
}