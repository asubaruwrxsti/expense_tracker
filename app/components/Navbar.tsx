import Link from "next/link";
export default function Navbar() {
    return (
        <nav className={"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top mb-5 position-sticky rounded-lg backdrop-blur-lg"}>
            <div className={"container-fluid"}>
                <div className={"navbar-wrapper"}>
                    <Link href={"/"} className={"navbar-brand"}> Home </Link>
                    <Link href={"/users"} className={'navbar-brand'}> Users </Link>
                    <Link href={"/expenses"} className={'navbar-brand'}> Expenses </Link>
                </div>
            </div>
        </nav>
    )
}