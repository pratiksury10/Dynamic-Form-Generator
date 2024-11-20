
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

const FormGenerator: React.FC<{ schema: FormSchema }> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{schema.formTitle}</h2>
      <p className="mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => {
          switch (field.type) {
            case 'text':
            case 'email':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id, { required: field.required })}
                    className={`border p-2 w-full ${errors[field.id] ? 'border-red-500' : ''}`}
                  />
                  {errors[field.id] && <span className="text-red-500">{field.validation?.message || 'This field is required'}</span>}
                </div>
              );

            case 'select':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}</label>
                  <select {...register(field.id, { required: field.required })} className={`border p-2 w-full ${errors[field.id] ? 'border-red-500' : ''}`}>
                    <option value="">Select...</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {errors[field.id] && <span className="text-red-500">{field.validation?.message || 'This field is required'}</span>}
                </div>
              );

            case 'radio':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}</label>
                  {field.options?.map(option => (
                    <div key={option.value}>
                      <input type="radio" value={option.value} {...register(field.id, { required: field.required })} />
                      <label>{option.label}</label>
                    </div>
                  ))}
                  {errors[field.id] && <span className="text-red-500">{field.validation?.message || 'This field is required'}</span>}
                </div>
              );

            case 'textarea':
              return (
                <div key={field.id}>
                  <label className="block mb-1">{field.label}</label>
                  <textarea
                    placeholder={field.placeholder}
                    {...register(field.id)}
                    className={`border p-2 w-full ${errors[field.id] ? 'border-red-500' : ''}`}
                  />
                  {errors[field.id] && <span className="text-red-500">{field.validation?.message || 'This field is required'}</span>}
                </div>
              );

            default:
              return null;
          }
        })}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default FormGenerator;
