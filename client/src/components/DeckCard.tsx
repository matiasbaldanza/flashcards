
export type DeckType = {
  _id: string,
  title: string,
  description: string,
  actions?: {
    delete: (_id: string) => void,
  },
};

export default function DeckCard({
  _id,
  title,
  description,
  actions
}: DeckType) {
  return (
    <div
      key={_id}
      className='relative border border-gray-400 rounded-md p-4 aspect-video group'
    >
      <h2 className='text-xl font-bold'>{title}</h2>
      <p>{description}</p>
      <p
        className="text-xs text-gray-500 absolute bottom-1 text-center left-1/2 transform -translate-x-1/2"
      >
        {_id}
      </p>

      {/* Actions */}
      <button
        className='opacity-0 absolute top-1 right-1 bg-red-500 aspect-square text-white px-2 py-1 rounded-md group-hover:opacity-90 transition-opacity duration-300'
        onClick={() => actions?.delete(_id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </button>
    </div>
  )
}