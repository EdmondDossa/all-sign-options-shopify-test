
export const ActivatabaleItem = ({title, status, toggleStatus ,children, fillIcon = false, noTrokeIcon=false }: {
    title: string;
    status: boolean;
    toggleStatus: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
  fillIcon?: boolean;
  noTrokeIcon?: boolean;
  })=>{
  
    return (<div
      onClick={() => { toggleStatus(!status) }}
      className={status ? `activatable-item active ${fillIcon && 'fill'}  ${noTrokeIcon && 'no-troke'}` : `activatable-item ${fillIcon && 'fill'}   ${noTrokeIcon && 'no-troke'}`}>
      <div className="activatable-item-child" >
          {children}
      </div>
      <div className="activatable-item-title">
        {title}
      </div>
    </div>)
  }
  