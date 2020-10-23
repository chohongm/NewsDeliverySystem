import {useState} from "react";

type PostboxProps = {
  categories: string[],
  categorySubscribers: {[key: string]: string[]}
}
//
// type CategorySubscribersProps = {
//   sports: string[],
//   business: string[],
//   game: string[],
//   economics: string[]
// }
//
// type SubscriberProps = {
//   userId: string,
//   subscribeUserToCategory: (userId: string, category: string) => void
// }
//
// type NewsProps = {
//   category: string,
//   contents: string
// }
//
// export const Postbox = (props: PostboxProps) => {
//
//   const [categorySubscribers, setCategorySubscribers] = useState<CategorySubscribersProps>({
//     sports: [],
//     business: [],
//     game: [],
//     economics: []
//   })
//
//   function subscribeUserToCategory(userId: string, category: string) {
//
//     const subscribers = categorySubscribers[category]
//
//     if (subscribers && !subscribers.includes(userId)) {
//       let copy: CategorySubscribersProps = {
//         ...categorySubscribers,
//       }
//
//       copy[category].push(userId)
//
//       setCategorySubscribers(copy)
//     }
//   }
//
//   async function sendNewsToUsers(news: NewsProps) {
//
//     const subscribers = categorySubscribers[news.category]
//
//     if (subscribers) {
//       try {
//         await Promise.all(subscribers.map(async (userId: string) => {
//           await sendNewsToUser(userId, news.contents)
//         }))
//
//       } catch (e) {
//         console.log('error: '+ e)
//       }
//     }
//   }
// }
//
// // API that Sends news to a user.
// async function sendNewsToUser(userId: string, contents: string) {
//   // Not required
// }
//
// export const Subscriber = (props: SubscriberProps) => {
//
//   const { userId, subscribeUserToCategory } = props
//
//   function subscribeToNewsCategory(category: string) {
//     subscribeUserToCategory(userId, category)
//   }
// }
//
// type PublisherProps = {
//   sendNewsToUsers: (news: NewsProps) => void
// }
//
// export const Publisher = (props: PublisherProps) => {
//
//   const { sendNewsToUsers } = props
//
//   function publishNews(category: string, contents: string) {
//     sendNewsToUsers({ category: category, contents: contents })
//   }
// }
