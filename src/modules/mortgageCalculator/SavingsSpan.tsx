

export default function SavingsSpan({ children, ...props }) {
  return (
    <span className="text-green-600 text-2xl font-semibold pr-2" {...props}>{children}</span>
  )
}
