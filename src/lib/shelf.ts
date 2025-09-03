export const SHELF_STATUS = {
	WANT_TO_READ: 'WANT_TO_READ',
	READING: 'READING',
	READ: 'READ'
} as const
export type SHELF_STATUS = keyof typeof SHELF_STATUS

export const SHELF_STATUS_ENUM = ['WANT_TO_READ', 'READING', 'READ'] satisfies [
	SHELF_STATUS,
	...SHELF_STATUS[]
]

export function getShelfStatusLabel(status: SHELF_STATUS | undefined) {
	switch (status) {
		case 'WANT_TO_READ':
			return 'Want to Read'
		case 'READING':
			return 'Reading'
		case 'READ':
			return 'Read'
		default:
			return undefined
	}
}
