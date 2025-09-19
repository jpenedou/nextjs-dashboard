'use client'
import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, UsersIcon, HomeIcon, DocumentCurrencyDollarIcon, PowerIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOutAction } from '@/app/lib/actions'

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
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-44 bg-white border-r shadow-lg p-4 flex-col z-40">
          <h2 className="text-lg font-semibold mb-4">{sidebarTitle}</h2>
        <nav className="space-y-3">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link key={name} href={href} className={linkClasses(href)}>
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="grow hidden md:block"></div>
        <form action={signOutAction}>
          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600  md:px-3">
            <PowerIcon className="w-6" />
            <div>Sign Out</div>
          </button>
        </form>
      </aside>

      <Transition
        show={isOpen}
        enter="transition-transform ease-out duration-300"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform ease-in duration-200"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {/* Sidebar móvil */}
        <div
          className="fixed inset-0 w-44 h-full bg-white shadow-lg p-4 flex flex-col z-50"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="mb-6 self-end text-gray-600 hover:text-black"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        <h2 className="text-lg font-semibold mb-4">{sidebarTitle}</h2>
          <nav className="space-y-3">
            {navItems.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                className={linkClasses(href)}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex-grow" />

          <form action={signOutAction}>
            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
              <PowerIcon className="w-6" />
              <div>Sign Out</div>
            </button>
          </form>
        </div>
      </Transition>
    </>
  )
}
