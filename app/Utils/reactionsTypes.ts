const reactionsTypes = ['like', 'love', 'haha', 'sad', 'angry'] as const

type ReactionTypes = typeof reactionsTypes[number]

export { reactionsTypes, ReactionTypes }
