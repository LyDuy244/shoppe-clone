interface Props {
  className?: string
  height?: string
  width?: string
  radius?: string
}

export default function Skeleton({ className, height, width, radius }: Props) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ height: height, width: width || '100%', borderRadius: radius }}
    ></div>
  )
}
