import { FormFieldsType } from "@/lib/formFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

export default function TheFormFields({ formFields, form }) {
  return (
    <>
      {formFields?.map((formField: FormFieldsType) => (
        <FormField
          key={formField.name}
          control={form.control}
          name={formField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formField.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={formField.placeholder}
                  type={formField.type}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
