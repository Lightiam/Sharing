import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white dark:bg-gray-900 fixed top-0 left-0 z-50" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between relative py-4">
          {/* Logo */}
          <div className="w-[150px]">
            <a href="/" className="block">
              <span className="text-2xl font-bold text-purple-700 dark:text-white">Spreadify AI</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <nav>
              <ul className="flex items-center gap-8">
                <li>
                  <a href="#features" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                    About
                  </a>
                </li>
              </ul>
            </nav>
            <Button variant="default" className="bg-purple-700 hover:bg-purple-800">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 py-4 px-4 shadow-lg">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                  Features
                </a>
                <a href="#pricing" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                  Pricing
                </a>
                <a href="#about" className="text-base font-medium text-gray-900 dark:text-gray-200 hover:text-purple-700">
                  About
                </a>
                <Button variant="default" className="bg-purple-700 hover:bg-purple-800 w-full">
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
