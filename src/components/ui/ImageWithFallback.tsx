import { useState, type ImgHTMLAttributes } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }

export function ImageWithFallback({ className, loading = 'lazy', ...props }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={`bg-card ${className ?? ''}`} role="presentation" />
  }

  return (
    <img {...props} loading={loading} className={className} onError={() => setFailed(true)} />
  )
}
