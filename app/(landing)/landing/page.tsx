import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { QrCode, Palette, BarChart3, Globe, Smartphone, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <span className="text-xl font-bold">QR Menu</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/panel/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/panel/register">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-20 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
            <Zap className="mr-2 h-4 w-4" />
            <span>Transform Your Restaurant Experience</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Digital Menus Made
            <br />
            <span className="text-primary">Simple & Beautiful</span>
          </h1>
          
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Create stunning QR code menus for your restaurant in minutes. 
            No technical skills required. Fully customizable and mobile-optimized.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/panel/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            No credit card required • 14-day free trial
          </p>
        </div>
        
        {/* Hero Image/Mockup Placeholder */}
        <div className="relative w-full max-w-5xl mt-8">
          <div className="aspect-video rounded-lg border bg-muted/50 flex items-center justify-center">
            <div className="text-center">
              <Smartphone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Menu Preview Demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-20 md:py-32 bg-muted/50">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Powerful features to create and manage your digital menu with ease
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1: QR Code Generation */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">QR Code Generation</h3>
              <p className="text-muted-foreground">
                Generate unlimited QR codes for your tables. Download and print in high quality.
              </p>
            </div>
          </div>
          
          {/* Feature 2: Custom Branding */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Custom Branding</h3>
              <p className="text-muted-foreground">
                Customize colors, add your logo, and choose from beautiful pre-built themes.
              </p>
            </div>
          </div>
          
          {/* Feature 3: Analytics */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track menu views, popular items, and customer engagement in real-time.
              </p>
            </div>
          </div>
          
          {/* Feature 4: Multi-language */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Multi-language Support</h3>
              <p className="text-muted-foreground">
                Serve international customers with menus in multiple languages.
              </p>
            </div>
          </div>
          
          {/* Feature 5: Mobile Optimized */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-muted-foreground">
                Beautiful, responsive design that works perfectly on all devices.
              </p>
            </div>
          </div>
          
          {/* Feature 6: Instant Updates */}
          <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
              <p className="text-muted-foreground">
                Update prices and availability instantly. Changes reflect immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-20 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Choose the plan that fits your restaurant. No hidden fees.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="flex flex-col rounded-lg border bg-background p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-muted-foreground mb-4">Perfect for small restaurants</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₺299</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Up to 50 menu items</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">10 QR codes</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Basic analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">2 languages</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Email support</span>
              </li>
            </ul>
            
            <Link href="/panel/register">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Professional Plan */}
          <div className="flex flex-col rounded-lg border-2 border-primary bg-background p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-4">For growing restaurants</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">₺599</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unlimited menu items</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unlimited QR codes</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Unlimited languages</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Custom branding</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Priority support</span>
              </li>
            </ul>
            
            <Link href="/panel/register">
              <Button className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-lg border bg-background p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-4">For restaurant chains</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Everything in Professional</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Multiple locations</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">API access</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">24/7 phone support</span>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="container py-20 md:py-32 bg-muted/50">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            See It In Action
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Check out how other restaurants are using QR Menu
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Example 1 */}
          <div className="flex flex-col rounded-lg border bg-background overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <QrCode className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Modern Cafe</h3>
              <p className="text-muted-foreground mb-4">
                Clean and minimal design with beautiful product photography
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Demo
              </Button>
            </div>
          </div>
          
          {/* Example 2 */}
          <div className="flex flex-col rounded-lg border bg-background overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <QrCode className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
              <p className="text-muted-foreground mb-4">
                Elegant theme with detailed descriptions and wine pairings
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Demo
              </Button>
            </div>
          </div>
          
          {/* Example 3 */}
          <div className="flex flex-col rounded-lg border bg-background overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <QrCode className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Fast Food</h3>
              <p className="text-muted-foreground mb-4">
                Bold colors and quick navigation for fast service
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-20 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Have questions? We&apos;re here to help you get started
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {/* Email */}
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border bg-background">
            <div className="rounded-full bg-primary/10 p-3">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">support@qrmenu.app</p>
            </div>
          </div>
          
          {/* Phone */}
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border bg-background">
            <div className="rounded-full bg-primary/10 p-3">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">+90 (555) 123-4567</p>
            </div>
          </div>
          
          {/* Live Chat */}
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-lg border bg-background">
            <div className="rounded-full bg-primary/10 p-3">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 9am-6pm</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col gap-4 p-8 rounded-lg border bg-background max-w-2xl">
            <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
            <p className="text-muted-foreground">
              Join hundreds of restaurants already using QR Menu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <Link href="/panel/register">
                <Button size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <QrCode className="h-6 w-6" />
                <span className="text-xl font-bold">QR Menu</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Digital menu platform for modern restaurants. Create, customize, and manage your menu with ease.
              </p>
              {/* Social Media Links */}
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Product */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-primary transition-colors">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="#examples" className="hover:text-primary transition-colors">Examples</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Updates</a>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">About</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Blog</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Careers</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">API Reference</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">Status</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 QR Menu. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
