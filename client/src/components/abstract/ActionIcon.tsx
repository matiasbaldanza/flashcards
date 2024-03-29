const iconsUrl = "action-icons.svg";

export type TActionIcon =
  "delete" |
  "edit" |
  "flip" |
  "open";

export default function ActionIcon({
  icon,
}: { icon: TActionIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" height="16"
      fill="currentColor"
      viewBox="0 0 16 16">
      <use href={`${iconsUrl}#${icon}`} />
    </svg>
  )
}
