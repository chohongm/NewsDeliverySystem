export class Postbox {
  categorySubscribers: {[key: string]: Subscriber[]}
  newsByCategory: {[key: string]: News[]}

  constructor(categories: string[]) {
    this.categorySubscribers = {}
    this.newsByCategory = {}
    categories.forEach((category) => {
      this.categorySubscribers[category] = []
      this.newsByCategory[category] = []
    })
  }

  subscribeUserToCategory(user: Subscriber, category: string) {
    const subscribers = this.categorySubscribers[category]

    if (subscribers && !this.isUserSubscribed(subscribers, user)) {
      subscribers.push(user)

      // New subscriber receives old news published.
      this.newsByCategory[category].forEach((news) => {
        user.receiveNews(news)
      })
    }
  }

  unsubscribeUserFromCategory(user: Subscriber, category: string) {
    const subscribers = this.categorySubscribers[category]

    if (subscribers && this.isUserSubscribed(subscribers, user)) {
      this.categorySubscribers[category] = subscribers.filter((candidate) => candidate.id !== user.id)
    }
  }

  isUserSubscribed(categoryUsers: Subscriber[], user: Subscriber) {
    return categoryUsers.find((candidate: Subscriber) => {
      return candidate.id === user.id
    })
  }

  sendNewsToUsers(news: News) {
    const categoryNews = this.newsByCategory[news.category]

    if (categoryNews) {
      categoryNews.push(news)
    }

    const subscribers = this.categorySubscribers[news.category]

    subscribers.forEach((user) => {
      user.receiveNews(news)
    })
  }
}

export class News {
  category: string
  contents: string

  constructor(category: string, contents: string) {
    this.category = category
    this.contents = contents
  }

  toString() {
    return 'category: ' + this.category + ', contents: ' + this.contents + '\n'
  }
}

export class Subscriber {

  id: string
  postbox: Postbox
  news: News[]

  constructor(id: string, postbox: Postbox) {
    this.id = id
    this.postbox = postbox
    this.news = []
  }

  subscribeToNewsCategory(category: string) {
    this.postbox.subscribeUserToCategory(this, category)
  }

  unsubscribeFromNewsCategory(category: string) {
    this.postbox.unsubscribeUserFromCategory(this, category)
  }

  receiveNews(news: News) {
    this.news.push(news)
    
    // One time subscription
    this.unsubscribeFromNewsCategory(news.category)
  }

  getNews() {
    return this.news
  }

  getId() {
    return this.id
  }
}

export class Publisher {

  postbox: Postbox

  constructor(postbox: Postbox) {
    this.postbox = postbox
  }

  publishNews(news: News) {
    this.postbox.sendNewsToUsers(news)
  }
}
