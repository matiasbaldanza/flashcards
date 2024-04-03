import { TDeck, TActions } from '@shared/types/types';
import ActionButton from '@/components/abstract/ActionButton';
import Card from '@/components/abstract/Card';

export type TDeckCardProps = TDeck & {
  actions?: TActions,
};

export default function DeckCard({
  _id,
  title,
  description,
  actions
}: TDeckCardProps) {
  return (
    <Card>
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
    </Card>
  )
}