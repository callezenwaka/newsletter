// 
export const authors = [
	{ 
		id: 'd99fb4b9-e2eb-4f40-8064-de0bc3e84521', 
		displayName: "John Doe", 
		email: "john.doe@mail.com", 
		phoneNumber: "+2348030003000",
		photoURL: `http://localhost:${process.env.PORT}/images/1654061899456_avatar.png`,
		role: "user",
		isActive: true,
	},
	{ 
		id: 'bc31956f-8f62-40cc-90b0-4acbc1141b3d', 
		displayName: "Jane Doe", 
		email: "jane.doe@mail.com", 
		phoneNumber: "+2348030003000",
		photoURL: `http://localhost:${process.env.PORT}/images/1654061899456_avatar.png`,
		role: "user",
		isActive: true,
	},
	{ 
		id: '6921fb51-78c4-441e-9e5c-86c61fcc72e7', 
		displayName: "Jack Doe", 
		email: "jack.doe@mail.com", 
		phoneNumber: "+2348030003000",
		photoURL: `http://localhost:${process.env.PORT}/images/1654061899456_avatar.png`,
		role: "user",
		isActive: true,
	},
]

export const posts = [
	{ 
		id: '3e4124c2-ba8c-4058-a2ec-520470e69350', 
		title: "Post one",
		content: "Nisi deserunt et enim eu officia tempor id consequat incididunt adipisicing voluptate. Deserunt ad occaecat labore cillum ipsum labore exercitation consectetur non. Minim officia cupidatat est voluptate occaecat Lorem exercitation cupidatat in mollit. Ex aute laborum ea elit. Do exercitation commodo ad mollit. Lorem esse deserunt sit consequat. Magna aliquip proident commodo dolor sit. Minim voluptate non labore laborum labore ea incididunt laboris quis consectetur. Proident qui est labore pariatur ipsum culpa minim cillum veniam in enim cillum mollit. Dolor id officia cupidatat est ut qui quis laborum nisi sunt. Eu sunt Lorem aliquip deserunt voluptate. Tempor anim ut commodo minim fugiat sit exercitation voluptate esse mollit anim quis do. Reprehenderit esse aute incididunt cillum. Labore irure nulla deserunt tempor.",
		authorId: 'd99fb4b9-e2eb-4f40-8064-de0bc3e84521',
		photoURL: `http://localhost:${process.env.PORT}/images/1653861292642_blogging.jpeg`,
		date: 1653857594387,
		isPublished: true,
	},
	{ 
		id: '79b0dbea-be08-4104-976b-6e311d476e2a', 
		title: "Post two", 
		content: "This is a stub types definition. express-graphql provides its own type definitions, so you do not need this installed", 
		authorId: 'bc31956f-8f62-40cc-90b0-4acbc1141b3d',
		photoURL: `http://localhost:${process.env.PORT}/images/1653861292642_blogging.jpeg`,
		date: 1653857594387,
		isPublished: true,
	},
	{ 
		id: '642b9ca3-8b8b-4895-a3ff-52af924aeccb', 
		title: "Post three", 
		content: "This is a stub types definition. express-graphql provides its own type definitions, so you do not need this installed", 
		authorId: '6921fb51-78c4-441e-9e5c-86c61fcc72e7',
		photoURL: `http://localhost:${process.env.PORT}/images/1653861292642_blogging.jpeg`,
		date: 1653857594387,
		isPublished: true,
	},
]

// export default db = {}

// exports.db = { authors, posts, };

export const db = { authors, posts, };