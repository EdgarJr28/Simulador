import Image from "next/image";
import Logo from "../../../public/next.svg"
import BurgerMenu from "../buttons/test";
const Navbar = () => {
    return (
        <nav className="fixed w-full h-24 shadow-xl bg-white">
            <div className='flex justify-between items-center h-full w-full px-4 2x1:px-16'>
                <Image src={Logo}
                    alt={'Logo'}
                    width={205}
                    height={75}
                    className="cursor-pointer"
                    priority
                />

                <div>
                    <ul className="hidden sm:flex">
                        <li className="ml-10 uppercase hover:border b text-xl">Why Us</li>
                        <li className="ml-10 uppercase hover:border b text-xl">Contact Us</li>
                        <li className="ml-10 uppercase hover:border b text-xl">Blog</li>
                        <li className="ml-10 uppercase hover:border b text-xl">Our Services</li>
                        <BurgerMenu />

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
