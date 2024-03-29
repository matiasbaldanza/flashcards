import ActionIcon, { TActionIcon } from "@/components/abstract/ActionIcon";

export default function ActionButton({
  icon,
  action,
}: {
  icon: TActionIcon;
  action: () => void;
}) {
  const baseStyles = 'px-2 py-1 text-white transition-opacity duration-300 rounded-md opacity-0 aspect-square group-hover:opacity-90 hover:cursor-pointer';

  const color =
    icon === 'delete' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <button
      className={`${baseStyles} ${color}`}
      onClick={(e) => {
        e.stopPropagation();
        action()
      }}
    >
      <ActionIcon icon={icon} />
    </button>
  );
}