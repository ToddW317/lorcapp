import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/decks', label: 'Decks' },
    { path: '/tournaments', label: 'Tournaments' },
    { path: '/collection', label: 'Collection' },
    { path: '/matches', label: 'Matches' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-heading font-bold">Lorcana Tracker</Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-accent transition-colors duration-200 ${
                  isActive(item.path) ? 'text-accent font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
