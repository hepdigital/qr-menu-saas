import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Menu - QR Menu SaaS",
  description: "View restaurant menu",
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
