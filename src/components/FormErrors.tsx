import DismissibleAlert from "@/components/DismissibleAlert";

/** layout.blade.php içindeki @if($errors->any()) bloğunun karşılığı. */
export default function FormErrors({ errors }: { errors: string[] }) {
  if (!errors.length) return null;

  return (
    <DismissibleAlert variant="danger">
      <ul className="mb-0">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </DismissibleAlert>
  );
}
