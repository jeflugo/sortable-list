import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<li className='px-6 py-2 hover:bg-gray-50 cursor-pointer select-none'>
				{props.id}
			</li>
		</div>
	)
}
