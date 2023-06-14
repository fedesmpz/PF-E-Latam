'use client'
import Providers from "../redux/provider/Provider"
import store from "../redux/store/store"
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title> E-Latam 💻 </title>
      </head>
      <body>
        <Providers store={store}>
          {children}
        </Providers>
      </body>
    </html>
  )
}