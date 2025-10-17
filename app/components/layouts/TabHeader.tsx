// import { NavLink } from "@remix-run/react";
// import { BlockStack, Box, InlineStack } from "@shopify/polaris";
// import { SizeSvg } from "~/components/svgs/SizeSvg";
// import { BorderSvg } from "~/components/svgs/BorderSvg";
// import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
// import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
// import { ShapeSvg } from "~/components/svgs/ShapeSvg";
// import { TextImageSvg } from "~/components/svgs/TextImageSvg";
// import { AdditinalOptionSvg } from "../svgs/AdditinalOptionSvg";
// import { DiscountProductSvg } from "~/components/svgs/DiscountProductSvg";

// export const Tabheader = () => {
    
//     return (
//         <Box paddingInline="050" background="bg-surface">
//           <InlineStack gap="100" align="center">
//             <TabItems to="size">
//                 <SizeSvg /> Sizes
//             </TabItems>
//             <TabItems to="color">
              
//               <ColorPaletteSvg />  colors
//             </TabItems>
//             <TabItems to="shape">
//               <ShapeSvg /> Shapes
//             </TabItems>
//             <TabItems to="border">
//               <BorderSvg /> Borders
//             </TabItems>
//             <TabItems to="fixing-method">
//               <FixingMethodSvg /> Fixing methods
//             </TabItems>
//             <TabItems to="text-image">
//               <TextImageSvg /> Text/Image
//             </TabItems>
//             <TabItems to="discount-product">
//               <DiscountProductSvg /> Discount Product
//             </TabItems>
//             <TabItems to="additional-option">
//               <AdditinalOptionSvg /> Additional components
//             </TabItems>
//           </InlineStack>
//         </Box>)
// };


// export const TabItems = ({
//   to,
//   children,
// }: {
//   to: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <NavLink
//       className={({ isActive, isPending }) =>
//         isActive ? "tab-items active" : "tab-items"
//       }
//       to={to}
//     >
//       <BlockStack align="center">
//         <InlineStack align="center">
//           <div style={{display: 'flex', gap: '7px', fontSize: '0.9em'}}>
//             {children}
//           </div>
//         </InlineStack>
//       </BlockStack>
//     </NavLink>
//   );
// };
  

import React from 'react';
import { NavLink } from "@remix-run/react";
import { BlockStack, Box, InlineStack } from "@shopify/polaris";
import { SizeSvg } from "~/components/svgs/SizeSvg";
import { BorderSvg } from "~/components/svgs/BorderSvg";
import { ColorPaletteSvg } from "~/components/svgs/ColorPaletteSvg";
import { FixingMethodSvg } from "~/components/svgs/FixingMethodSvg";
import { ShapeSvg } from "~/components/svgs/ShapeSvg";
import { TextImageSvg } from "~/components/svgs/TextImageSvg";
import { AdditinalOptionSvg } from "../svgs/AdditinalOptionSvg";
import { DiscountProductSvg } from "~/components/svgs/DiscountProductSvg";
interface TabItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: (id: string) => void;
}

const TabItem = ({ id, label, icon, selected, onClick }: TabItemProps) => (
  <div
    onClick={() => onClick(id)}
    style={{
      cursor: 'pointer',
      padding: '8px 12px',
      // borderBottom: selected ? '2px solid #008060' : '2px solid transparent',
      background: selected ? '#E8E8E8' : 'transparent',
      // color: selected ? '#008060' : '#000',
      color: '#000',
      fontWeight: selected ? 'bold' : 'normal',
      justifyContent: "start",
      borderRadius: "7px"
    }}
  >
    <InlineStack align="start">
      <div style={{ display: 'flex', gap: '7px', fontSize: '0.9em', alignItems: 'center' }}>
        {icon} {label}
      </div>
    </InlineStack>
  </div>
);

interface TabHeaderProps {
  selectedTab: string;
  onSelectTab: (tabId: string) => void;
}

export const TabHeader = ({ selectedTab, onSelectTab }: TabHeaderProps) => (
  <div style={{
    // display: 'flex',
    // border: '10px solid red',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px 0px',
    border: '1px solid rgba(0, 0, 0, 0.15)'
  }}>
  {/* <Box paddingInline="050" background="bg-surface"> */}
    {/* <InlineStack gap="100" align="center">
    </InlineStack> */}
    <div 
      className='mate'
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "4px 10px"
      }}
    >
      <TabItem id="size" label="Sizes" icon={<SizeSvg />} selected={selectedTab === 'size'} onClick={onSelectTab} />
      <TabItem id="color" label="Colors" icon={<ColorPaletteSvg />} selected={selectedTab === 'color'} onClick={onSelectTab} />
      <TabItem id="shape" label="Shapes" icon={<ShapeSvg />} selected={selectedTab === 'shape'} onClick={onSelectTab} />
      <TabItem id="border" label="Borders" icon={<BorderSvg />} selected={selectedTab === 'border'} onClick={onSelectTab} />
      <TabItem id="fixing-method" label="Fixing Method" icon={<FixingMethodSvg />} selected={selectedTab === 'fixing-method'} onClick={onSelectTab} />
      <TabItem id="text-image" label="Text/Image" icon={<TextImageSvg />} selected={selectedTab === 'text-image'} onClick={onSelectTab} />
      <TabItem id="discount-product" label="Discount Product" icon={<DiscountProductSvg />} selected={selectedTab === 'discount-product'} onClick={onSelectTab} />
      <TabItem id="additional-option" label="Additional Option" icon={<AdditinalOptionSvg />} selected={selectedTab === 'additional-option'} onClick={onSelectTab} />
    </div>
  {/* </Box> */}
  </div>
);
  