import Link from 'next/link';
import logo from '../../public/myLogo.png';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        - 404 -
      </h1>
      <div className="overflow-hidden relative" style={{width: '400px', height: '280px'}}>
        <Image src={logo} alt="My Logo" fill objectFit="cover" />
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">It seam like you got lost...</p>
      <br />
      <Link href="/" className="hover:underline">
        Return Home
      </Link>
    </div>
  );
}
