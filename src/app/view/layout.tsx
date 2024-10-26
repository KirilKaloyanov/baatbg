export default function AdminLayout({
    children 
} : {
    children: React.ReactNode
}) {
    return (<>
        <div style={{ backgroundColor: "lightblue"}}>
        {children}
        <p>text</p>
        </div>
    </>)
}