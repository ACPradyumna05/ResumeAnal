export function Card({ children, className }) {
return (
    <div className={`bg-white p-4 rounded-xl shadow ${className || ''}`}>
    {children}
    </div>
)
}

export function CardHeader({ children }) {
return <div className="border-b pb-2 mb-2">{children}</div>
}

export function CardTitle({ children }) {
return <h2 className="text-lg font-semibold">{children}</h2>
}

export function CardContent({ children }) {
return <div>{children}</div>
}
