export interface ChildrenProviderProps {
  children: React.ReactNode
}

export interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}
