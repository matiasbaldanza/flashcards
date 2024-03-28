
export type DeckType = {
  _id: string,
  title: string,
  description: string,
};

export default function DeckCard({
  _id,
  title,
  description,
}: DeckType) {
  return (<div
    key={_id}
    className='border border-gray-400 rounded-md p-4 aspect-video'
  >
    <h2 className='text-xl font-bold'>{title}</h2>
    <p>{description}</p>
    <p
      className="text-xs text-gray-500 mt-2"
    >{_id}</p>
  </div>)
}