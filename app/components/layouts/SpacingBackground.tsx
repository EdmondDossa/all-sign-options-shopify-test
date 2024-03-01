export  const SpacingBackground = ({
    children,
    width,
    height,
  margin ,
  display = "block",
  backgroundColor =false,
  border =false,
    
  }: {
    children: React.ReactNode;
    width: string;
    height: string;
    margin?: string;
    display?: string;
    backgroundColor?:false|string;
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
          border: border ? border : 'none'
        }}
      >
        {children}
      </div>
    );
  };
  