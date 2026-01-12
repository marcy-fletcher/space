import {useAuth} from "../../auth/hooks/useAuth.ts";
import Button from "../../common/components/Button.tsx";
import {UserButton} from "./UserButton.tsx";
import {cn} from "../../utils/cn.ts";
import {useNavigate} from "react-router-dom";

const UserSection = () => {
    const {initialized, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    if (!initialized) {
        return null;
    }

    return (
        <>
            <div>
                {!isAuthenticated && (
                    <div className={cn("flex flex-row gap-2")}>
                        <Button className="whitespace-nowrap" variant={'link'} shape={'rounded'} animation={'static'} onClick={() => navigate('/login')}>
                            Sign In
                        </Button>

                        <Button className="whitespace-nowrap" variant={'gradient'} shape={'rounded'} animation={'static'} onClick={() => navigate('/register')}>
                            Join Us
                        </Button>
                    </div>
                )}
                {isAuthenticated && (
                    <UserButton className="max-w-42"/>
                )}
            </div>
        </>
    );
};

export default UserSection;