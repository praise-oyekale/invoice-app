import "../StylingFiles/invoice-header.css"
import addBtn from "../assets/addplus.svg";
import dropdown from "../assets/dropdown.svg";


function InvoiceHeader({ invoices, isDropDown, setIsDropDown, setFormMode, setStatusChange, statusChange }) {
  
 
  
  
  return (
    <div
    className="invoice-header-container"
      
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{fontSize: '24px'}}>Invoice</h1>
        <p style={{ color: '#ABAFC8', fontSize: '13px'}}>
          {invoices.length === 0
            ? "No invoice"
            : `${invoices.length} invoice`}{" "}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        <div className="Dropdowncontainer">
          <button
            onClick={() => { 
              setIsDropDown(!isDropDown)
            } }
            className="drop-down"
          >
            {" "}
            <strong>Fliter</strong>{" "}
            <span>
              {" "}
              <img src={dropdown} alt="dropdown arrow" />{" "}
            </span>
          </button>

          {
            isDropDown && (
              <div
            style={{
              position: "absolute",
              fontFamily: "sans-serif",
              display: "flex",
              flexDirection: "column",
              fontSize: "13px",
              marginTop: "5px",
              boxShadow: "0px 0px  10px rgba(112, 110, 110, 0.2)",
              padding: "8px",
              borderRadius: "5px",
              fontWeight:'600'
            }}
          >
            <label onClick={() => setStatusChange("all")} style={{fontSize: '12px', marginBottom: '5px', cursor: 'poi'}}>
               Clear Fliter
            </label>
            <label>
              <input type="checkbox" checked={statusChange === "Draft"} onChange={() => setStatusChange("Draft")} /> Draft
            </label>
            <label>
              <input type="checkbox"  checked={statusChange === "Pending"} onChange={() => setStatusChange("Pending")} /> Pending
            </label>
            <label>
              <input type="checkbox" checked={statusChange === "Paid"} onChange={() => setStatusChange("Paid")} /> Paid
            </label>
          </div>
            )
          }
        </div>

        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#7C5DFA",
            border: "none",
            borderRadius: "24px",
            width: "90px",
            height: "44px",
            color: "white",
            fontWeight: "600",
            fontFamily: "sans-serif",
            fontSize: "15px",
            cursor: 'pointer',
            padding: '6px'
          }}
          onClick={() => setFormMode('create')}
        >
          <img src={addBtn} alt="addplusbtn" /> New{" "}
        </button>
      </div>
    </div>
  );
}

export default InvoiceHeader;
