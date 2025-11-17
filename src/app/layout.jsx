import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'CSI Official',
  description: 'Together We Code, Create, and Conquer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

