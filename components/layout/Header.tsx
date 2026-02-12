'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  // Track whether each panel is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false)

  // Toggle portfolio panel (closes menu if open)
  const togglePortfolio = () => {
    if (isMenuOpen) setIsMenuOpen(false)
    setIsPortfolioOpen(!isPortfolioOpen)
  }

  // Toggle nav menu (closes portfolio if open)
  const toggleMenu = () => {
    if (isPortfolioOpen) setIsPortfolioOpen(false)
    setIsMenuOpen(!isMenuOpen)
  }

  // Close everything (used by overlay click)
  const closeAll = () => {
    setIsMenuOpen(false)
    setIsPortfolioOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>

        {/* Down-arrow / chevron button — LEFT SIDE */}
        <button
          className={`${styles.portfolioButton} ${isPortfolioOpen ? styles.portfolioButtonOpen : ''}`}
          onClick={togglePortfolio}
          aria-label={isPortfolioOpen ? 'Close portfolio menu' : 'Open portfolio menu'}
          aria-expanded={isPortfolioOpen}
        >
          <svg
            className={styles.chevronIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Centered logo */}
        <Link href="/" className={styles.logo}>
          Backbar<span className={styles.logoAccent}>.fyi</span>
        </Link>

        {/* Hamburger / X button — RIGHT SIDE */}
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Dark overlay — covers page when EITHER panel is open */}
      <div
        className={`${styles.overlay} ${(isMenuOpen || isPortfolioOpen) ? styles.overlayVisible : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Portfolio panel — slides from LEFT */}
      <nav
        className={`${styles.portfolioPanel} ${isPortfolioOpen ? styles.portfolioPanelOpen : ''}`}
        aria-hidden={!isPortfolioOpen}
      >
        <div className={styles.portfolioContent}>
          <div className={styles.portfolioLabel}>Our Portfolio</div>

          <div className={styles.portfolioLinks}>
            <a
              href="https://somm.site"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Somm.Site</div>
              <div className={styles.portfolioSiteDesc}>Explore Wine Culture</div>
            </a>

            <a
              href="https://somm.tips"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Somm.Tips</div>
              <div className={styles.portfolioSiteDesc}>Wine Pairings & Shopping Insights</div>
            </a>

            <a
              href="https://beverage.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Beverage.fyi</div>
              <div className={styles.portfolioSiteDesc}>Online Magazine</div>
            </a>

            <a
              href="https://hospitality.fyi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioItem}
              onClick={closeAll}
            >
              <div className={styles.portfolioSiteName}>Hospitality.fyi</div>
              <div className={styles.portfolioSiteDesc}>Online Magazine</div>
            </a>
          </div>

          {/* Divider */}
          <div className={styles.portfolioDivider}></div>

          {/* Parent company */}
          <div className={styles.presentedByLabel}>Presented By</div>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.parentCompanyLink}
            onClick={closeAll}
          >
            Informative Media
          </a>
        </div>
      </nav>

      {/* Navigation panel — slides from RIGHT (existing) */}
      <nav
        className={`${styles.navPanel} ${isMenuOpen ? styles.navPanelOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.navContent}>
          {/* Brand header */}
          <div className={styles.navBrand}>Backbar<span className={styles.logoAccent}>.fyi</span></div>

          {/* Main navigation links */}
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink} onClick={closeAll}>
              Home
            </Link>
            <Link href="/articles" className={styles.navLink} onClick={closeAll}>
              Articles
            </Link>
            <Link href="/about" className={styles.navLink} onClick={closeAll}>
              About Us
            </Link>
            <a
              href="mailto:derekengles@gmail.com"
              className={styles.navLink}
              onClick={closeAll}
            >
              Contact Us
            </a>
          </div>

          {/* Divider line */}
          <div className={styles.navDivider}></div>

          {/* Legal links */}
          <div className={styles.legalLinks}>
            <Link href="/cookies" className={styles.legalLink} onClick={closeAll}>
              Cookie Policy
            </Link>
            <Link href="/privacy" className={styles.legalLink} onClick={closeAll}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.legalLink} onClick={closeAll}>
              Terms of Use
            </Link>
            <Link href="/disclaimer" className={styles.legalLink} onClick={closeAll}>
              Content Policy
            </Link>
          </div>

          {/* Social icon */}
          <div className={styles.socialLinks}>
            <a
              href="https://www.instagram.com/backbar.fyi/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Follow us on Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}