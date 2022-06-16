export interface User {
  userId?: number,
  nickName: string,
  email: string,
  profilePhotoPath?: string,
  description?: string,
  passwordHashed?: string,
  loginPassword?: string,
  twitter?: string,
  instagram?: string,
  postCount?: number,
  followingCount? :number,
  followerCount?: number
}
