type InfoFieldProps = {
  label: string
  value?: string | number | null
}

export const InfoField = ({ label, value }: InfoFieldProps) => (
  <div className="space-y-1">
    <label className="block text-lg font-bold">{label}</label>

    <div className="w-full rounded-md border bg-muted px-4 py-2 text-base">
      {value || '-'}
    </div>
  </div>
)
