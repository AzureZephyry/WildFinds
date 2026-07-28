function FormField({ label, htmlFor, children }) {
  return (
    <div className="form-row">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}

export default FormField;
