import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ label, error, ...inputProps }) => {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Input {...inputProps} className={error ? "border-error focus:border-error focus:ring-error" : ""} />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormField;