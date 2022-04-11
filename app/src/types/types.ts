type PostType = {
	id: number
	message: string
	likesCount: number
}
type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainlink: string
}
type PhotosType = {
	small: string | null
	large: string | null
}
type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
}

export {
  PostType,
  ContactsType,
  PhotosType,
  ProfileType
};