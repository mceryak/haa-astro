export type FormItem = {
  name: string
  label: string
  cols?: 1 | 2 | 3
  required?: boolean
  type?: string
  options?: string[]
}

export type FormState = {
  fieldErrors: {
    [field: string]: string | null | undefined
  }
  values: {
    [field: string]: string | null | undefined
  }
  error?: string | null
}

export type FormActionResult = {
  success: boolean 
  fieldErrors: { [key: string]: string }
  error?: string | null | undefined
}