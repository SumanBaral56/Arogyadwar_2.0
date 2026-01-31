export function Button({ children, className, onClick, ...props }) {
  return <button className={className} onClick={onClick} {...props}>{children}</button>;
}

export function Card({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
