interface FormInputProps {
  name: string;
  type: string;
  isRequired: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
export default function FormInput({name, type, isRequired, value, onChange, placeholder}: FormInputProps){
    return (
        <div>
        <label htmlFor={name} className="sr-only">
          Mot de passe
        </label>
        <input
          id={name}
          name={name}
          type={type}
          required={isRequired}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    )
}