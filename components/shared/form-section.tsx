type Props = {
  title: string
}

export const FormSection = ({ title }: Props) => {
  return (
    <p className="border-b pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {title}
    </p>
  )
}
