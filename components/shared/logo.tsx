import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex w-full items-center justify-center">
      <Image
        src="/logos/logo-light.png"
        alt="ServiExpress"
        width={180}
        height={60}
        priority
        className="block h-36 w-auto object-contain dark:hidden"
      />

      <Image
        src="/logos/logo.png"
        alt="ServiExpress"
        width={180}
        height={60}
        priority
        className="hidden h-36 w-auto object-contain dark:block"
      />
    </div>
  )
}
