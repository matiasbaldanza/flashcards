import { TDeck } from '@/api/decks';
import ActionButton from '@/components/abstract/ActionButton';

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
        <ActionButton
          icon="delete"
          action={() => actions?.delete(_id)}
        />
        <ActionButton
          icon="open"
          action={() => actions?.open(_id)}
        />
      </div>
    </div>
  )
}