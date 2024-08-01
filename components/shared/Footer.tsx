import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col garp-4 p-5 text-center
                            text-xs sm:flex-row">
                <Link href="/">
                    <Image 
                    src="/assets/logo/EventUpLogoINV-wide.svg"
                    alt="logo"
                    width={80}
                    height={38}
                    />
                </Link>
                <p> 2024 EventUp! Sva prava zadržana. </p>
            </div>
        </footer>
    )
}

export default Footer;