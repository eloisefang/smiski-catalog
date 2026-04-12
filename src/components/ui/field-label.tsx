export function FieldLabel({
  children,
  weight = "semibold",
}: {
  children: React.ReactNode;
  weight?: "semibold" | "normal" | "bold";
}) {
  return (
    <span
      className={
        weight === "normal"
          ? "text-xs font-normal uppercase tracking-[0.1em] text-stone-500"
          : weight === "bold"
            ? "text-xs font-bold uppercase tracking-[0.1em] text-stone-500"
            : "text-xs font-semibold uppercase tracking-[0.1em] text-stone-500"
      }
    >
      {children}
    </span>
  );
}
