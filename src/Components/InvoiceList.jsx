import "../StylingFiles/invoice-lists.css";

function InvoiceList({ invoices, setViewingInvoiceId, displayedInvoices }) {
  return (
    <div className="invoice-list-container">
      {displayedInvoices.map((invoice) => {
        const statusStyles = {
          Paid: { bg: "var(--color-paid-bg)", text: "var(--color-paid-text)"},
          Pending: { bg: "var(--color-pending-bg)", text: "var(--color-pending-text)"},
          Draft: { bg: "var(--color-draft-bg)", text: "var(--color-draft-text)"},
        };

          const currentStatusColor =
            statusStyles[invoice.status] || "var(--color-darft)";

        return (
          <div
            key={invoice.id}
            className="invoice-lists-card"
            onClick={() => setViewingInvoiceId(invoice.id)}
          >
            <div className="invoice-list-section1">
              <h5
                style={{
                  fontSize: "15px",
                  lineHeight: "15px",
                  letterSpacing: "-0.25px",
                }}
                className="invoice-list-id"
              >
                <span className="hash">#</span>
                {invoice.id}
              </h5>
              <span className="client-name">{invoice.clientName}</span>
            </div>

            <div className="invoice-list-section2">
              <div
              className="due-date"
                
              >
                <span className="list-payment-due">
                  Due {invoice.paymentDue}
                </span>
                <strong>£ {invoice.total}</strong>
              </div>

              <button
              className="status-pill-btn"
                style={{
                  backgroundColor: currentStatusColor.bg, color: currentStatusColor.text
                }}
              >
                <strong
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor:
                      invoice.status === "Paid"
                        ? "#33D69F"
                        : invoice.status === "Pending"
                          ? "#FF8F00"
                          : "#373B53",
                    borderRadius: "50px",
                    padding: "5px",
                  }}
                ></strong>
                <h5>{invoice.status} </h5>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InvoiceList;
