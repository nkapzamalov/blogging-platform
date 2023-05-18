import { useState, useEffect } from 'react'
import { meJson, meResponse } from '../calls/meEndpoint'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Header({ isLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    async function getResponse() {
      const res = await meJson();
      const userId = res
      setUserId(userId)
    }
    getResponse();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      Router.push("/")
    } catch (err) {

    }
  };

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 gap-4 lg:px-8" aria-label="Global">
        <Link href="/" className="-m-1.5 p-1.5 uppercase font-bold text-2xl leading-6 text-gray-900">
          rise<span className='text-mypurple'>blog</span>
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-mypurple">
            Home
          </Link>
          {isLoggedIn === true && (
            <Link href="/newPost" className="text-sm font-semibold leading-6 text-gray-900 hover:text-mypurple">
              Create Article
            </Link>
          )}
          {isLoggedIn === false && (
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-mypurple">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
          {isLoggedIn === true && (
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900 hover:text-mypurple">
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5 uppercase font-bold text-2xl leading-6 text-gray-900">
              rise<span className='text-mypurple'>blog</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Home
                </Link>
                {isLoggedIn === true && (
                  <Link
                    href="/newPost"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    CreateArticle
                  </Link>
                )}
              </div>
              <div className="py-6">
                {isLoggedIn === false && (
                  < Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
                {isLoggedIn === true && (
                  < Link
                    href="/logout"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header >
  )
}
