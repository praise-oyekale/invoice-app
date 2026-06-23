import { useEffect, useMemo, useState } from "react";
import "./App.css";
import InvioceNavBar from "./Components/Invoice-NavBar";
import InvoiceHeader from "./Components/InvoiceHeader";
import EmptyInvioce from "./Components/Empty-Page";
import InvoiceList from "./Components/InvoiceList";
import InvoiceDetails from "./Components/Invoice-Details";
import InvoiceForm from "./Components/InvoiceForm";

function App() {
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem("invoice_app_data");
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });

  useEffect(() => {
    localStorage.setItem("invoice_app_data", JSON.stringify(invoices));
  },[invoices])

  const generateInvoiceId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let id = "";
    for (let i = 0; i < 2; i++) id += letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 0; i < 4; i++) id += numbers.charAt(Math.floor(Math.random() * numbers.length));

    return id

  };

  const handlSaveAndSend = (newInvoiceData) => {
    if(formMode === "create"){
      const finalizedInvoice = {
      ...newInvoiceData,
      id: generateInvoiceId(),
      status: "Pending"
    };

    setInvoices((prevInvoices) => [finalizedInvoice, ...prevInvoices]);
    } else if (formMode === "edit"){
      setInvoices((prevInvoices) => prevInvoices.map((inv) => inv.id === newInvoiceData.id ? newInvoiceData : inv )); 
      setFormMode("view")
    }

    

    setFormMode("view")
    setViewingInvoiceId(null)
  }

  const handleMarkAsPaid = (invoiceId) => {
    setInvoices((prevInvoices) => prevInvoices.map((inv) => inv.id === invoiceId ? {...inv, status: "Paid"}: inv))
  }





  const [isDropDown, setIsDropDown] = useState(false);

  const [viewingInvoiceId, setViewingInvoiceId] = useState(null);

  const [formMode, setFormMode] = useState("view");

   const [showModel, setShowModel] = useState(false);


  const [statusChange, setStatusChange] = useState("all"); 
  const [showForm, setShowForm] = useState(false);
  const [drawerMode, setDrawerMode] = useState("create")

  // const singleInvoiceData = invoices.find(inv => inv.id === viewingInvoiceId);

  const currentInvoice = useMemo(() => {
    return invoices.find((inv) => inv.id === viewingInvoiceId);
  }, [viewingInvoiceId, invoices]);


  const handleDeleteInvoice = (idToDelete) => {
    setInvoices((prevInvoices) => prevInvoices.filter((inv) => inv.id !== idToDelete));

    setFormMode('view')
    setViewingInvoiceId(null)
  }


  const displayedInvoices = invoices.filter((invoice) => {
    if (statusChange === 'all'){
      return true
    }
    return invoice.status.toLowerCase() === statusChange.toLowerCase();
  });

  return (
    <div>
      <InvioceNavBar />
      {
        viewingInvoiceId === null ? (
          <>
          <InvoiceHeader
            invoices={invoices}
            isDropDown={isDropDown}
            setIsDropDown={setIsDropDown}
            formMode={formMode}
            setFormMode={setFormMode}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
          />
          {
            invoices.length === 0 ? (
              <EmptyInvioce />
            ): (
               <InvoiceList
              invoices={invoices}
              displayedInvoices={displayedInvoices}
              setViewingInvoiceId={setViewingInvoiceId}
            />
            )
          }
          </>
        ) : (
         <InvoiceDetails
        //  formMode=
          invoiceId={viewingInvoiceId}
          invoices={invoices}
          setViewingInvoiceId={setViewingInvoiceId}
          formMode={formMode}
          setFormMode={setFormMode}
          currentInvoice={currentInvoice}
          showModel={showModel}
          setShowModel={setShowModel}
          onDeleteInvoice={handleDeleteInvoice}
          setStatusChange={setStatusChange}
          onMarkAsPaid={handleMarkAsPaid}

        /> 
        )
      }
      {(formMode === "create" || formMode === "edit") && (
        <InvoiceForm
          formMode={formMode}
          setFormMode={setFormMode}
          existingInvoice={currentInvoice}
          setViewingInvoiceId={setViewingInvoiceId}
          onSaveInvoice={handlSaveAndSend}
        />
      ) }
      {/* {formMode === "create" ? (
        <InvoiceForm
          formMode={formMode}
          setFormMode={setFormMode}
          existingInvoice={currentInvoice}
          setViewingInvoiceId={setViewingInvoiceId}
          onSaveInvoice={handlSaveAndSend}
        />
      ) : formMode === "edit" ? (
        <InvoiceForm
          formMode={formMode}
          setFormMode={setFormMode}
          existingInvoice={currentInvoice}
          setViewingInvoiceId={setViewingInvoiceId}
          onSaveInvoice={handlSaveAndSend}
        />
      ) : viewingInvoiceId === null ? (
        <>
          <InvoiceHeader
            invoices={invoices}
            isDropDown={isDropDown}
            setIsDropDown={setIsDropDown}
            formMode={formMode}
            setFormMode={setFormMode}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
          />
          {invoices.length === 0   ? (
            <EmptyInvioce />
          ) : (
            <InvoiceList
              invoices={invoices}
              displayedInvoices={displayedInvoices}
              setViewingInvoiceId={setViewingInvoiceId}
            />
          )}
        </>
      ) : formMode === "view" ? (
        <InvoiceDetails
          invoiceId={viewingInvoiceId}
          invoices={invoices}
          setViewingInvoiceId={setViewingInvoiceId}
          formMode={formMode}
          setFormMode={setFormMode}
          currentInvoice={currentInvoice}
          showModel={showModel}
          setShowModel={setShowModel}
          onDeleteInvoice={handleDeleteInvoice}
          setStatusChange={setStatusChange}
          onMarkAsPaid={handleMarkAsPaid}

        />
      ) : null} */}
    </div>
  );
}

export default App;
