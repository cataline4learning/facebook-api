const fileCategories = ['avatar', 'post'] as const

type FileCategory = typeof fileCategories[number]

export { fileCategories, FileCategory }
