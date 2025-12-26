export function Button({ children, className }) {
  return <button className={className}>{children}</button>;
}

export function Card({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
