import { queryParams } from "@/modules/readQueryParams/store";
import { useStore } from "@nanostores/react";
import type { FormInput } from "./Form";
import Form from "./Form";


// ! This component is dependent on the module: readQueryParams

export default function QueryParamsForm({ formItems, defaultValues={}, action }: FormInput) {
  const $queryParams = useStore(queryParams);

  return (
    <Form 
      formItems={formItems} 
      defaultValues={Object.keys($queryParams).reduce((acc, k) => ({ ...acc, [k]: $queryParams[k]?.at(0) }), defaultValues)}
      action={action}
    />
  )
}
