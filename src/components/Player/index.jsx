import React from 'react'
import { render } from 'react-dom'
import ReactAwesomePlayer from 'react-awesome-player'

export default class Player extends React.Component {
  state = {
    options: {
      poster: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=854361313,3188166359&fm=26&gp=0.jpg",
      sources: [{
        type: "video/mp4",
        src: "https://172.16.0.9:3001/stream"
      }],
      subtitles: [{
          language: 'pt',
          url: "https://feawesome.github.io/react-awesome-player/en.vtt",
          label: "PT"
      }],
      defaultSubtitle: 'pt'
    }
  }

  render () {
    const { options } = this.state
    return <div className="test-demo">
      <ReactAwesomePlayer options={options}/>
    </div>
  }
}
