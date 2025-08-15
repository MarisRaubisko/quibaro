"use client";

import Image from 'next/image'

export default function WatchImage({image}: any) {
  if(image){
    const [width, height] = image.size.split('x').map(Number);
    return (
      <div className="relative z-50 mx-auto max-w-full max-h-full">
      <Image className='rounded-lg' alt={image.prompt} src={image.photo} height={height} width={width} />
    </div>
  )}
}
