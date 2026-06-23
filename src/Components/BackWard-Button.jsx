import backwardslach from "../assets/backward.svg";
import "../StylingFiles/back-ward.css"

function BackWardButton({ setViewingInvoiceId ,setFormMode, formMode }) {
  const backslashColorChange = formMode === 'view'? 'whitecolor':"lightwhite"
  return (
    <button
      onClick={() => {
        setFormMode('view')
        setViewingInvoiceId(null)
      }}
      className={  ` back-slash-btn  ${backslashColorChange}`}
      
    >
      <img src={backwardslach} alt="backward" /> 
      <strong>Go back</strong>
    </button>
  );
}

export default BackWardButton;
