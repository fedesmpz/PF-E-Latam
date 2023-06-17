'use client'
import Providers from "../redux/provider/Provider"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
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