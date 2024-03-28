import { TDeck } from '../api/decks';

export default function DeckCard({
  _id,
  title,
  description,
  actions
}: TDeck) {
  return (
    <div
      key={_id}
      className='relative p-4 transition-transform duration-300 border border-gray-400 rounded-md aspect-video group hover:cursor-pointer hover:transform hover:scale-105 hover:shadow-md hover:border-blue-500 hover:border-spacing-4 hover:border-2'
      onClick={() => actions?.click(_id)}
    >
      <h2 className='text-xl font-bold'>{title}</h2>
      <p>{description}</p>
      <p
        className="absolute text-xs text-center text-gray-500 transform -translate-x-1/2 bottom-1 left-1/2"
      >
        {_id}
      </p>

      {/* Actions */}
      <button
        className='absolute px-2 py-1 text-white transition-opacity duration-300 bg-red-500 rounded-md opacity-0 top-1 right-1 aspect-square group-hover:opacity-90'
        onClick={(e) => {
          e.stopPropagation();
          actions?.delete(_id)
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
        </svg>
      </button>
    </div>
  )
}