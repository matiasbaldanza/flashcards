import { ReactNode } from 'react';

export default function Layout({
  children
}: { children: ReactNode }) {
  return (
    <div className='container w-[90%] mx-auto lg:w-[80%] lg:px-4 flex flex-col gap-2 h-dvh'>
      <header className='mt-4 lg:mt-10'>
        <h1 className='text-xl font-bold text-left text-black lg:text-2xl'>
          Flashcards App
        </h1>
      </header>
      <main className='grow'>
        {children}
      </main>
      <footer>
        <p className='py-4 text-sm text-center text-gray-500 lg:py-8'>
          &copy; {new Date().getFullYear()} Flashcards App
        </p>
      </footer>
    </div>
  )
}