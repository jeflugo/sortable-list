import { useState } from 'react'
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem'

function App() {
	const [items, setItems] = useState([1, 2, 3])
	const sensors = useSensors(
		useSensor(TouchSensor),
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)
	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<div className='w-[500px] mx-auto mt-5'>
				<h2 className='text-2xl font-bold text-center'>Subjects</h2>
				<ul className='shadow-lg rounded-sm'>
					<SortableContext items={items}>
						{items.map(id => (
							<SortableItem key={id} id={id} />
						))}
					</SortableContext>
				</ul>
			</div>
		</DndContext>
	)
	function handleDragEnd(event) {
		const { active, over } = event

		if (active.id !== over.id) {
			setItems(items => {
				const oldIndex = items.indexOf(active.id)
				const newIndex = items.indexOf(over.id)

				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}
}

export default App
