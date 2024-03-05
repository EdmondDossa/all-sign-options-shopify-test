import CircleNotCheckIcon from "../icons/CircleNotCheckIcon"

export const CheckSpan = ({ checked }: { checked: boolean}) => {
    return (<span className={checked ? "check-span check" : "check-span"}>
        <CircleNotCheckIcon />
    </span>);
}