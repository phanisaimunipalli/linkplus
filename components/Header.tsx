import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-1 space-y-1">
        <Image
          alt="header text"
          src="/charge.png"
          className="sm:w-12 sm:h-12 w-8 h-5"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          LinkPlus
        </h1>
        {/* <p className="font-bold">Your Link to a Better LinkedIn Profile!</p> */}
      </Link>
      {/* <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a> */}
      {/* <p>aaa</p> */}
    </header>
  );
}
