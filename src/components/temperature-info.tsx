type Props = { label: string; value: string };

export const TemperatureInfo = ({ label, value }: Props) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}</span>
    <span className="font-bold">{value}°</span>
  </div>
);
