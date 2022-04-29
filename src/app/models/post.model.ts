export interface Post {
  postId?: number;
  userId: number,
  nickName?: string,
  profilePhotoPath?: string,
  postPath?: string,
  postTitle: string,
  postDescription: string,
  likeCount?: number
}
