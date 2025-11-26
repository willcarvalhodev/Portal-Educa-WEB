import Image from 'next/image';

export function Logo() {
  return (
    <>
      <Image
        src="/images/icon.ico"
        alt="Portal Educa"
        width={60}
        height={60}
        className="object-contain"
        priority
      />
      <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Portal Educa
      </span>
    </>
  );
}

