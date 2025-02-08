import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import '@testing-library/jest-dom'

// Mock window.matchMedia for responsive design testing
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Landing Page', () => {
  it('renders hero section with correct content', () => {
    renderWithRouter(<LandingPage />)
    
    expect(screen.getByText(/Streamline Your Social Media/i)).toBeInTheDocument()
    expect(screen.getByText(/Spreadify AI/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument()
  })

  it('renders navigation menu items', () => {
    renderWithRouter(<LandingPage />)
    
    expect(screen.getByText(/Features/i)).toBeInTheDocument()
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument()
    expect(screen.getByText(/About/i)).toBeInTheDocument()
  })

  it('shows mobile menu when hamburger is clicked', () => {
    renderWithRouter(<LandingPage />)
    
    const hamburgerButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(hamburgerButton)
    
    // Mobile menu items should be visible
    expect(screen.getAllByText(/Features/i)[0]).toBeVisible()
    expect(screen.getAllByText(/Pricing/i)[0]).toBeVisible()
    expect(screen.getAllByText(/About/i)[0]).toBeVisible()
  })

  it('navigates to dashboard when Get Started is clicked', () => {
    renderWithRouter(<LandingPage />)
    
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i })
    fireEvent.click(getStartedButton)
    
    // Should navigate to dashboard
    expect(window.location.pathname).toBe('/dashboard')
  })

  it('displays supported platform icons', () => {
    renderWithRouter(<LandingPage />)
    
    const platformIcons = screen.getAllByRole('img', { name: /platform icon/i })
    expect(platformIcons.length).toBeGreaterThan(0)
  })

  it('maintains layout integrity at different viewport sizes', () => {
    const { container } = renderWithRouter(<LandingPage />)
    
    // Test mobile viewport
    window.innerWidth = 375
    fireEvent(window, new Event('resize'))
    expect(container.querySelector('.lg\\:hidden')).toBeVisible()
    
    // Test desktop viewport
    window.innerWidth = 1024
    fireEvent(window, new Event('resize'))
    expect(container.querySelector('.hidden.lg\\:flex')).toBeVisible()
  })

  it('scrolls to sections when nav links are clicked', () => {
    renderWithRouter(<LandingPage />)
    
    const featuresLink = screen.getByText(/Features/i)
    const mockScrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = mockScrollIntoView
    
    fireEvent.click(featuresLink)
    expect(mockScrollIntoView).toHaveBeenCalled()
  })

  it('loads images with correct alt text and src', () => {
    renderWithRouter(<LandingPage />)
    
    const heroImage = screen.getByAltText(/Spreadify AI Dashboard/i)
    expect(heroImage).toHaveAttribute('src', expect.stringContaining('hero-image'))
  })

  it('handles theme toggle correctly', () => {
    renderWithRouter(<LandingPage />)
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(themeToggle)
    
    // Check if dark mode classes are applied
    expect(document.documentElement).toHaveClass('dark')
  })

  it('maintains accessibility standards', () => {
    renderWithRouter(<LandingPage />)
    
    // Check for ARIA labels
    expect(screen.getByRole('banner')).toBeInTheDocument() // Header
    expect(screen.getByRole('navigation')).toBeInTheDocument() // Nav menu
    expect(screen.getByRole('main')).toBeInTheDocument() // Main content
  })
})
