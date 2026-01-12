import Card from "../../layout/Card.tsx";
import Header from "./Header.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../utils/cn.ts";

interface LoaderProps {
    className?: string;
}

const Loader = ({className}: LoaderProps) => {
    return (
        <div className={cn("flex items-center justify-center flex-col select-none", className)}>
            <img alt="loader" className="image-sharp w-64 h-64 object-contain" src="public/loading.gif"></img>
            <Card className="-mt-2 rounded-full">
                <Header>
                    <FontAwesomeIcon className="mr-3" icon={faSpinner} spin/>
                    Getting things ready…
                </Header>
            </Card>
        </div>
    );
};

export default Loader;