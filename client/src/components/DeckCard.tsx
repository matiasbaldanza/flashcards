import { TDeck } from '../api/decks';
import ActionIcon from './ActionIcon';

export default function DeckCard({
  _id,
  title,
  description,
  actions
}: TDeck) {
  return (
    <div
      key={_id}
      className='relative p-4 transition-transform duration-300 border border-gray-400 rounded-md aspect-video group hover:transform hover:scale-105 hover:shadow-md hover:border-blue-500 hover:border-spacing-4 hover:border-2'
    >
      <h2 className='text-xl font-bold'>{title}</h2>
      <p>{description}</p>
      <p
        className="absolute text-xs text-center text-gray-500 transform -translate-x-1/2 bottom-1 left-1/2"
      >
        {_id}
      </p>

      {/* Actions */}
      <div
        className='absolute flex flex-col gap-1 top-1 right-1'
      >
        <button
          className='px-2 py-1 text-white transition-opacity duration-300 bg-red-500 rounded-md opacity-0 aspect-square group-hover:opacity-90 hover:cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            actions?.delete(_id)
          }}
        >
          <ActionIcon icon="delete" />
        </button>
        <button
          className='px-2 py-1 text-white transition-opacity duration-300 bg-blue-500 rounded-md opacity-0 aspect-square group-hover:opacity-90 hover:cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            actions?.open(_id)
          }}
        >
          <ActionIcon icon="open" />
        </button>

      </div>
    </div>
  )
}