import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';

const navigation = [
  { name: 'Johnny Arnett', href: '/', current: false },
  { name: 'Deployments', href: '/Builds', current: false },
  { name: 'Contact Me', href: '/Contact', current: false },
]

const rightNavigation = [
  { name: 'Github', href: 'https://github.com/jlarnett', current: false },
  { name: 'Youtube', href: 'https://www.youtube.com/@NHA_Coyote', current: false },
]

function classNames(...classes : any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NavigationBar() {
  return (
    <Disclosure as="nav" className="bg-neutral-100 dark:bg-zinc-900" data-testid='NavigationMenu' role="navigation">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-12 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
             <DisclosurePanel className="absolute top-full w-48 bg-neutral-100 dark:bg-zinc-900 shadow-lg rounded-md">
                <div className="py-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                          item.current ? ' block bg-gray-900 text-white' : 'block text-black-500 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        data-testid={`MobileNavLink-${item.name.replace(/\s+/g, '')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </DisclosurePanel>
        </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-black-500 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            data-testid={`NavLink-${item.name.replace(/\s+/g, '')}`}
                        >
                        {item.name}
                      </Link>
                    ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-4">
                {rightNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-black-500 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 text-sm font-medium rounded-md',
                    )}
                        data-testid={`RightNavLink-${item.name.replace(/\s+/g, '')}`}
                  >
                    {item.name}
                  </a>
                ))}
            </div>


          </div>
        </div>
      </div>
    </Disclosure>
  )
}
