
interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className="min-h-screen bg-slate-50">{children}</div>
    )
}