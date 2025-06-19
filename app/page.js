import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-center relative">
      {/* Header - now full width with no horizontal gap */}
      <div className="w-full py-6 flex justify-between items-center shadow-lg border-gray-500 absolute top-0 left-0 right-0">
        <div className='flex gap-2 items-center ml-8'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h2 className="font-bold text-2xl p-2"> Scholaritz </h2>
        </div>
      </div>

      {/* Side images - now with tilt */}
      <div className="absolute left-24 top-1/2 transform -translate-y-1/2 -rotate-6">
        <Image src="/knowledge.png" alt="Study Icon" width={80} height={80} />
      </div>
      <div className="absolute right-24 top-1/2 transform -translate-y-1/2 rotate-6">
        <Image src="/code.png" alt="Code Icon" width={80} height={80} />
      </div>

      {/* Main content with adjusted spacing to match the image */}
      <section className="flex flex-col items-center justify-center flex-grow max-w-3xl px-4 mt-16">
        <h1 className="mb-4 text-center">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-blue-600">AI-Powered</span>
            <span className="text-gray-900"> Exam Prep</span>
          </div>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mt-2">
            Material Generator
          </div>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-12 mt-8">
          Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips
        </p>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </section>
    </main>
  );
}