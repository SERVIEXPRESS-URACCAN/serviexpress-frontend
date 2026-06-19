'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
}

export function PreviewImage({ src, alt }: Readonly<Props>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden rounded-lg border">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            unoptimized
            className="
              h-72
              w-full
              object-contain
              bg-muted/20
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          <div
            className="
              absolute inset-0
              flex items-center justify-center
              bg-black/0
              transition-all
              group-hover:bg-black/20
            "
          ></div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-5xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        <DialogDescription className="sr-only">
          Vista ampliada del documento.
        </DialogDescription>

        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          unoptimized
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  )
}
