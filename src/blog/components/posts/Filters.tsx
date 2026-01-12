import Card from "../../../layout/Card.tsx";
import Select from "../../../common/components/Select.tsx";
import type {Order, SortBy} from "../../types/postSummary.ts";
import {useSearchStore} from "../../model/searchStore.ts";
import {useEffect, useState} from "react";
import type {SelectOption} from "../../../utils/selectOption.ts";
import Toggle from "../../../common/components/Toggle.tsx";
import {parseBoolean, serializeBoolean} from "../../../utils/parseBoolean.ts";

const SortByOptions: SelectOption<SortBy>[] = [
    { label: "Date", value: 'date' },
    { label: "Alphabet", value: "alphabet" },
]

const OrderOptions: SelectOption<Order>[] = [
    { label: "Desc", value: "desc" },
    { label: "Asc", value: 'asc' },
]

const Filters = () => {

    const {params, setParams} = useSearchStore();
    const [sortBy, setSortBy] = useState<SortBy>(params.sortBy ?? 'date');
    const [order, setOrder] = useState<Order>(params.order ?? 'desc');
    const [hideUnavailable, setHideUnavailable] = useState<boolean>(
        parseBoolean(params.hideUnavailable));

    useEffect(() => {
        async function onParamsUpdate() {
            setSortBy(params.sortBy ?? 'date');
            setOrder(params.order ?? 'desc');
            setHideUnavailable(
                parseBoolean(params.hideUnavailable));
        }

        onParamsUpdate();
    }, [params]);

    return (
        <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4">
            <div className="flex items-center gap-4">
                <Select label="Sort by:"
                        value={sortBy}
                        options={SortByOptions}
                        onChange={(str) => setParams({...params, sortBy: str as SortBy})}/>

                <Select label="Order:"
                        value={order}
                        options={OrderOptions}
                        onChange={(str) => setParams({...params, order: str as Order})}/>

            </div>

            <Toggle
                label="Hide unavailable"
                checked={hideUnavailable}
                onChange={(checked) => setParams({...params, hideUnavailable: serializeBoolean(checked)})}
            />
        </Card>
    );
};

export default Filters;