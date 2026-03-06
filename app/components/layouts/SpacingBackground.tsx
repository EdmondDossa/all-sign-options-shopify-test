const SpacingBackground = ({
    children,
    width = "100%",
    height = "auto",
  margin ,
  display = "block",
  backgroundColor =false,
  border =false,
  borderRadius =false,
  borderTop =false,
  borderBottom =false,
  borderLeft =false,
  borderRight =false,
  
    
  }: {
    children: React.ReactNode;
    width?: string;
    height?: string;
    margin?: string;
    display?: string;
    backgroundColor?:false|string;
    borderRadius?:false|string;
    borderTop?:false|string;
    borderBottom?:false|string;
    borderLeft?:false|string;
    borderRight?:false|string;
    border?:false|string;
  }) => {
    return (
      <div
        style={{
          display: display,
          width: width,
          height: height,
          margin: margin ? margin : 'none',
          backgroundColor: backgroundColor ? backgroundColor : 'none',
          borderRadius: borderRadius ? borderRadius : 'none',
          borderTop: borderTop ? borderTop : border ? border : 'none',
          borderBottom: borderBottom ? borderBottom : border ? border : 'none',
          borderLeft: borderLeft ? borderLeft : border ? border : 'none',
          borderRight: borderRight ? borderRight : border ? border : 'none',
    
        }}
      >
        {children}
      </div>
    );
  };

export { SpacingBackground };
export default SpacingBackground;
  
