import { Link } from "@remix-run/react";
import { Page } from "@shopify/polaris";

export default function MaterielsIndex() {
    

    return (<Page>
        <h1> I material list</h1>
        <Link to="/app/configuration/materiels/size">Size</Link>
    </Page>)
}