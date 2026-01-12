import {Link} from "react-router-dom";
import Header from "../../common/components/Header.tsx";
import Subtitle from "../../common/components/Subtitle.tsx";

interface LogotypeProps {
    image?: string;
    title: string;
    subtitle: string;
}

const Logotype = ({image, title, subtitle}: LogotypeProps) => {
    return (
        <Link to="/" className="flex items-center gap-3">
            {image && (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover text-transparent"
                    />
                </div>)}
            <div className="hidden md:hidden lg:block">
                <Header className="text-xs xl:text-sm">
                    {title}
                </Header>
                <Subtitle className="text-xs xl:text-sm">
                    {subtitle}
                </Subtitle>
            </div>
        </Link>
    );
};

export default Logotype;