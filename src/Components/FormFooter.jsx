import "../StylingFiles/form-footer.css";

function FormFooter({
  formMode,
  setFormMode,
  setViewingInvoiceId,
  setShowModel,
  currentInvoice,
  onMarkAsPaid
}) {
  return (
    <div className={`form-footer ${formMode === 'view' ? "details-page-footer":  "drawer-form-footer"}`}>
      {formMode === "create" && (
        <CreateButtons
          setFormMode={setFormMode}
          formMode={formMode}
          setViewingInvoiceId={setViewingInvoiceId}
        />
)}  {formMode === "edit" && (
        <EditButtons setFormMode={setFormMode} formMode={formMode} />
      ) } {formMode === "view" && (
        <ViewButtons setFormMode={setFormMode} setShowModel={setShowModel} currentInvoice={currentInvoice} onMarkAsPaid={onMarkAsPaid} />
      ) } 
    </div>
  );
}

function EditButtons({setFormMode}) {
  return (
    <div className="edit-btns-container" >
      <button
      className="cancel-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "20px",
          width: "120px",
          height: "48px",
          color: "#7E88C3",
          fontWeight: "700",
          cursor: "pointer",
        }}
      onClick={() => setFormMode("view")}
      >
        Cancel
      </button>
      <button
        type="submit"
        style={{
          fontSize: "11px",
          border: "none",
          padding: "10px",
          borderRadius: "20px",
          width: "160px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          backgroundColor: "#7C5DFA",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
        // onClick={() => setFormMode('view')}
      >
        Save Change
      </button>
    </div>
  );
}
function ViewButtons({ setFormMode, setShowModel, currentInvoice, onMarkAsPaid }) {
  return (
    <div className="view-btns" >
      <button
      className="edit-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "120px",
          height: "48px",
          color: "#7E88C3",
          fontWeight: "700",
          cursor: "pointer",
        }}
        onClick={() => setFormMode("edit")}
      >
        Edit
      </button>
      <button
      className="delete-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "140px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          cursor: "pointer",
          whiteSpace:'nowrap'
        }}
        onClick={() => setShowModel(true)}
      >
        Delete
      </button>
      {
        currentInvoice.status !== "Paid" && (
          <button
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "160px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          backgroundColor: "#7C5DFA",
          cursor: "pointer",
        }}
        onClick={() => onMarkAsPaid(currentInvoice.id)}
      >
        Mark as Paid
      </button>
        )
      }
    </div>
  );
}

function CreateButtons({ setFormMode, setViewingInvoiceId }) {
  return (
    <div className="create-btns-container" >
      <button
        type="button"
        onClick={() => {
          setFormMode("view");
          setViewingInvoiceId(null);
        }}
        className="discard-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "120px",
          height: "48px",
          color: "#7E88C3",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        discard
      </button>

      <button
        type="button"
        style={{
          fontSize: "11px",
          border: "none",
          padding: "10px",
          borderRadius: "25px",
          width: "160px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          backgroundColor: "#373B53",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
      >
        Save as Draft
      </button>

      <button
        type="submit"
        style={{
          fontSize: "11px",
          border: "none",
          padding: "10px",
          borderRadius: "25px",
          width: "160px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          backgroundColor: "#7C5DFA",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
      >
        Save & Send
      </button>
    </div>
  );
}



export const ActionButtons = ({setFormMode, setShowModel, currentInvoice, onMarkAsPaid}) =>{
  return (
    <div className="desktop-footer">
    <button
      className="edit-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "120px",
          height: "48px",
          color: "#7E88C3",
          fontWeight: "700",
          cursor: "pointer",
        }}
        onClick={() => setFormMode("edit")}
      >
        Edit
      </button>
      <button
      className="delete-btn"
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "140px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          cursor: "pointer",
        }}
        onClick={() => setShowModel(true)}
      >
        Delete
      </button>
      {
        currentInvoice.status !== "Paid" && (
          <button
        style={{
          fontSize: "13px",
          border: "none",
          padding: "15px",
          borderRadius: "25px",
          width: "160px",
          height: "48px",
          color: "white",
          fontWeight: "700",
          backgroundColor: "#7C5DFA",
          cursor: "pointer",
        }}
        onClick={() => onMarkAsPaid(currentInvoice.id)}
      >
        Mark as Paid
      </button>
        )
      }
    </div>
  )
}
export default FormFooter;
