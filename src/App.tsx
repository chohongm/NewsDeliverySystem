import React from 'react';
import {News, Postbox, Publisher, Subscriber} from "./classes";

const NEWS_CATEGORIES = ['sports', 'economics', 'business']

function App() {

  const postbox: Postbox = new Postbox(NEWS_CATEGORIES)
  const publisher: Publisher = new Publisher(postbox)
  const subscribers: Subscriber[] = Array.from(Array(7).keys()).map((i) => new Subscriber('sid_' + i, postbox))

  subscribers.forEach((user, i) => {
    user.subscribeToNewsCategory(NEWS_CATEGORIES[i % NEWS_CATEGORIES.length])
  })

  // Unsubscribe 'sid_3' from 'sports' category
  subscribers[3].unsubscribeFromNewsCategory(NEWS_CATEGORIES[0])

  // Publish news to sports category
  publisher.publishNews(new News(NEWS_CATEGORIES[0], 'some ' + NEWS_CATEGORIES[0] + ' news'))

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', paddingTop: '6em' }}>
      news received by each subscriber:<br/><br/>
      {
        subscribers.map((user) => {
          return <>
            { 'Subscriber id: ' + user.getId() }
            <br/>
            received news:
            <br/>
            { user.getNews().toString() }
            <br/>
            <br/>
          </>
        })
      }
    </div>
  )
}

export default App
