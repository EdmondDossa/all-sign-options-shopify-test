import { Icon } from "@shopify/polaris";

export default function CircleCheckIcon({color}:{color?:string}) {
    return (<Icon
        source='<svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="29" height="27" rx="13.5" fill="#016464" stroke="#016464"/>
        <path d="M12.5501 20.0001L6.8501 14.3001L8.2751 12.8751L12.5501 17.1501L21.7251 7.9751L23.1501 9.4001L12.5501 20.0001Z" fill="white"/>
        </svg>
        ' />);
}