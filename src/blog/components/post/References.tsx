import Header from "../../../common/components/Header.tsx";
import {cn} from "../../../utils/cn.ts";
import type {Reference} from "../../types/reference.ts";
import {faCalendar, faQuestion, faStickyNote, faUser} from "@fortawesome/free-solid-svg-icons";
import ExternalLinkButton from "../about/ExternalLinkButton.tsx";
import Foldout from "../../../common/components/Foldout.tsx";

interface ReferencesProps {
    className?: string;
    references: Omit<Reference, 'id' | 'postId'>[];
}

const References = ({references, className}: ReferencesProps) => {

    const peopleReferences = references.filter(x => x.type === "person");
    const eventsReferences = references.filter(x => x.type === "event");
    const franchisesReferences = references.filter(x => x.type === "franchise");
    const otherReferences = references.filter(x => x.type === "other");

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <Header>Story References</Header>

            {peopleReferences && peopleReferences.length > 0 && <Foldout title="People" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                    {peopleReferences.map((x, index) => {
                        return <ExternalLinkButton
                            key={index}
                            isClickable={!!x?.url}
                            actionType={x.url ? 'open' : 'none'}
                            title={x.name}
                            subtitle={x.description}
                            content={x.url}
                            image={x.pictureUrl}
                            icon={faUser} variant={'gray'}/>
                    })}
                </div>
            </Foldout>}

            {eventsReferences && eventsReferences.length > 0 && <Foldout title="Events" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                    {eventsReferences.map((x, index) => {
                        return <ExternalLinkButton
                            key={index}
                            isClickable={!!x?.url}
                            actionType={x.url ? 'open' : 'none'}
                            title={x.name}
                            subtitle={x.description}
                            content={x.url}
                            image={x.pictureUrl}
                            icon={faCalendar} variant={'gray'}/>
                    })}
                </div>
            </Foldout>}

            {franchisesReferences && franchisesReferences.length > 0 && <Foldout title="Franchises" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                    {franchisesReferences.map((x, index) => {
                        return <ExternalLinkButton
                            key={index}
                            isClickable={!!x?.url}
                            actionType={x.url ? 'open' : 'none'}
                            title={x.name}
                            subtitle={x.description}
                            content={x.url}
                            image={x.pictureUrl}
                            icon={faStickyNote} variant={'gray'}/>
                    })}
                </div>
            </Foldout>}

            {otherReferences && otherReferences.length > 0 && <Foldout title="Other" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                    {otherReferences.map((x, index) => {
                        return <ExternalLinkButton
                            key={index}
                            isClickable={!!x?.url}
                            actionType={x.url ? 'open' : 'none'}
                            title={x.name}
                            subtitle={x.description}
                            content={x.url}
                            image={x.pictureUrl}
                            icon={faQuestion} variant={'gray'}/>
                    })}
                </div>
            </Foldout>}
        </div>
    );
};

export default References;