'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {
  Bars3Icon, XMarkIcon, UsersIcon, HomeIcon, DocumentCurrencyDollarIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const sidebarTitle = 'My Panel'

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    { name: 'Invoices', icon: DocumentCurrencyDollarIcon, href: '/dashboard/invoices' },
    { name: 'Customers', icon: UsersIcon, href: '/dashboard/customers' },
  ]

  const linkClasses = (href: string) =>
    `flex items-center gap-3 px-2 py-1 rounded ${pathname === href ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-800 hover:text-blue-600'
    }`

  return (
    <>
      {/* Botón para móviles */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 m-4 bg-blue-600 text-white rounded md:hidden fixed top-2 left-2 z-50"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-52 bg-white border-r shadow-lg p-6 flex-col z-40">
        <h2 className="text-xl font-semibold mb-6">{sidebarTitle}</h2>
        <nav className="space-y-3">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link key={name} href={href} className={linkClasses(href)}>
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Sidebar móvil con animación */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="w-52 bg-white shadow-lg p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="mb-6 self-end text-gray-600 hover:text-black"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-6">{sidebarTitle}</h2>
                <nav className="space-y-3">
                  {navItems.map(({ name, icon: Icon, href }) => (
                    <Link
                      key={name}
                      href={href}
                      className={linkClasses(href)}
                      onClick={() => setIsOpen(false)} // cerrar al hacer clic
                    >
                      <Icon className="w-5 h-5" />
                      {name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
