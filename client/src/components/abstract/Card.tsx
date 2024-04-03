export default function Card({
  className,
  children
}: {
  className?: string,
  children: React.ReactNode
}) {
  const baseStyles = 'relative p-4 transition-transform duration-300 border border-gray-400 rounded-md aspect-video group hover:transform hover:scale-105 hover:shadow-md hover:border-blue-500 hover:border-spacing-4 hover:border-2';

  return (
    <div
      className={`${baseStyles} ${className}`}
    >
      {children}
    </div>
  )
}