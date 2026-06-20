import emptyInvoice from "../assets/emptyinvoice.svg";
import '../StylingFiles/empty-invoice.css'

function EmptyInvioce() {
  return (
    <div style={{  height: "62vh" }}>
      <div
      className="emptyinvoice"
        
      >
        <img
          src={emptyInvoice}
          alt="emptyinvoice"
          style={{ width: "100%", margin: "auto" }}
        />
      </div>
    </div>
  );
}

export default EmptyInvioce;
