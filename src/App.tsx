
import React, { useState } from 'react';
import FormGenerator from './FormGenerator';

const initialSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address"
      }
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" }
      ]
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" }
      ]
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share..."
    }
  ]
};

const App: React.FC = () => {
  const [schema, setSchema] = useState(initialSchema);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <h1 className="text-2xl font-bold">JSON Editor</h1>
        <textarea
          aria-label="JSON Editor" // Added aria-label for accessibility
          value={JSON.stringify(schema, null, 2)}
          onChange={(e) => {
            try {
              const newSchema = JSON.parse(e.target.value);
              setSchema(newSchema);
            } catch (error) {
              console.error("Invalid JSON");
            }
          }}
          className="border p-2 w-full h-64"
        />
      </div>
      <div className="md:w-1/2 p-4">
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
};

export default App;
