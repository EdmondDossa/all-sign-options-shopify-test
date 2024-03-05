import ReactSwitch from "react-switch";

export  const ReactSwitchCustom = ({ checked, setChecked }: { checked:boolean; setChecked:any; }) => {
    return (  <ReactSwitch
        className="react-switch"
        checkedIcon={false}
        uncheckedIcon={false}
        height={18}
        handleDiameter={26}
        offColor="#F8F9FB"
        onColor="#F8F9FB"
        width={49}
        type="checkbox"
        checked={checked}
        checkedHandleIcon={
          <div
            style={{
              height: "26px",
              width: "26px",
              borderRadius: "50%",
              backgroundColor: "#D9D9D9",
              border: "5px solid #008000",
            }}
          ></div>
        }
        uncheckedHandleIcon={
          <div
            style={{
              height: "26px",
              width: "26px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: "5px solid #D9D9D9",
            }}
          ></div>
        }
        onChange={(checked) => {
          setChecked(checked);
        }}
      ></ReactSwitch>)
}