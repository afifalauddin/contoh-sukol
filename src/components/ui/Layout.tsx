import { Fragment, useState } from "react";
import { Dialog, Menu, Transition, Popover } from "@headlessui/react";
import {
  HomeIcon,
  Bars3Icon,
  CameraIcon,
  PlusSmallIcon,
  UserGroupIcon,
  Squares2X2Icon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "~/utils/helpers";
import Image from "next/image";
import Link from "next/link";

const sidebarNavigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    current: false,
    children: [
      { name: "Sukol", description: "Noob.", href: "/files" },
      { name: "Abol", description: "Hai.", href: "/photos" },
    ],
  },
  { name: "All Files", href: "/files", icon: Squares2X2Icon, current: false },
  { name: "Photos", href: "/photos", icon: CameraIcon, current: true },
  { name: "Shared", href: "/shared", icon: UserGroupIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export interface Props {
  children: React.ReactNode;
}

const SubMenu = ({
  list,
}: {
  list: {
    name: string;
    description: string;
    href: string;
  }[];
}) => {
  return (
    <Popover as="nav" className="z-10">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-white",
              "group inline-flex items-center rounded-md "
            )}
          >
            <ChevronRightIcon
              className={classNames("h-3 w-3 group-hover:text-white")}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-32 top-20 mt-3 w-screen max-w-md px-2 sm:px-0">
              <div className="rounded-full shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {list.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <p className="text-base font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const Layout = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="flex h-full">
        <div className="hidden w-28 overflow-y-auto bg-slate-100 md:block">
          <div className="flex w-full flex-col items-center py-6">
            <div className="flex flex-shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                width={200}
                height={75}
                src="/images/logo.png"
                alt="logo"
              />
            </div>
            <div className="mt-6 w-full flex-1 space-y-1 px-2">
              {sidebarNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-700 text-white"
                      : "text-slate-300 hover:bg-blue-500 hover:text-white",
                    "group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-blue-300 group-hover:text-white",
                      "h-6 w-6"
                    )}
                    aria-hidden="true"
                  />

                  <span className="mt-2">{item.name}</span>

                  {item.children && <SubMenu list={item.children} />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-blue-700 pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-1 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Image
                      className="h-8 w-auto"
                      src="/images/logo.png"
                      width={200}
                      height={75}
                      alt="logo"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-blue-800 text-white"
                                : "text-slate-100 hover:bg-blue-800 hover:text-white",
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-blue-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between bg-blue-800 px-4 sm:px-6">
                <div className="flex flex-1" />
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          width={32}
                          height={32}
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt="profile-picture"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-blue-400 p-1 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Action</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <section
                aria-labelledby="primary-heading"
                className="flex h-full min-w-0 flex-1 flex-col lg:order-last"
              >
                <h1 id="primary-heading" className="sr-only">
                  Headers
                </h1>
                {props.children}
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
