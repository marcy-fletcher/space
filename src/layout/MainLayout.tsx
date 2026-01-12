import {useState} from "react";
import {cn} from "../utils/cn.ts";
import Navbar from "./Navbar.tsx";
import Logotype from "./navbar/Logotype.tsx";
import NavLink from "./navbar/NavLink.tsx";
import ThemeToggle from "./navbar/ThemeToggle.tsx";
import Content from "./Content.tsx";
import MobileMenu from "./navbar/MobileMenu.tsx";
import HamburgerButton from "./navbar/HamburgerButton.tsx";
import UserSection from "./navbar/UserSection.tsx";
import {AppMeta} from "../appMeta.ts";
import {faBolt, faHome, faInfoCircle, faLightbulb} from "@fortawesome/free-solid-svg-icons";
import {Outlet} from "react-router-dom";
import Badge from "../common/components/Badge.tsx";
import {useAuth} from "../auth/hooks/useAuth.ts";

interface LayoutProps {
    className?: string;
}

const navLinks = [
    {to: "/", title: "Home", icon: faHome, requiresAuth: false},
    {to: "/idea", title: "Submit idea", icon: faLightbulb, requiresAuth: true},
    {to: "/subscriptions", title: "Subscriptions", icon: faBolt, requiresAuth: false},
    {to: "/about", title: "About me", icon: faInfoCircle, requiresAuth: false}
];

const MainLayout = ({className}: LayoutProps) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const {isAuthenticated} = useAuth();

    function closeMenu() {
        setIsMenuOpened(false);
    }

    return (
        <div
            className={cn("text-mono-800 dark:text-mono-100 min-h-screen bg-linear-to-br from-primary-50 via-shade-50 to-primary-100 dark:from-mono-900 dark:via-mono-800 dark:to-mono-900 flex flex-col", className)}>
            <Navbar>
                <nav className="flex items-center justify-between">
                    <Logotype
                        image={AppMeta.logoUrl}
                        title={AppMeta.appName}
                        subtitle={AppMeta.appDescription}/>
                    <div className="hidden md:flex gap-6 justify-start">
                        {navLinks.map((navLink, index) => (
                            (!navLink.requiresAuth || isAuthenticated) && <NavLink
                                key={index}
                                to={navLink.to}
                                title={navLink.title}
                                icon={navLink.icon}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle/>
                        <UserSection/>
                        <HamburgerButton
                            className="md:hidden"
                            isOpen={isMenuOpened}
                            onClick={() => {
                                setIsMenuOpened(!isMenuOpened)
                            }}
                        />
                    </div>
                </nav>

                <MobileMenu className="block md:hidden" isOpen={isMenuOpened}>
                    <div className="flex flex-col gap-3">
                        {navLinks.map((navLink, index) => (
                            <NavLink
                                key={index}
                                to={navLink.to}
                                title={navLink.title}
                                icon={navLink.icon}/>
                        ))}
                    </div>
                </MobileMenu>

            </Navbar>

            <Content>
                <Outlet />

                <div className="flex w-full mt-6 p-0 -mb-4 justify-center gap-2 select-none">
                    <Badge variant="gray" className="max-w-xs text-xs">
                        <p className="p-0">{AppMeta.appOwner} © {new Date().getFullYear()}</p>
                    </Badge>

                    <Badge variant="gray" className="text-xs max-w-xs">
                        <p>
                            Developed by CR
                        </p>
                    </Badge>
                </div>
            </Content>

            {isMenuOpened && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
                    onClick={closeMenu}
                />
            )}
        </div>
    );
};

export default MainLayout;