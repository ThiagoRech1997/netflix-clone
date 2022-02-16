import React from 'react'
import ReactAwesomePlayer from 'react-awesome-player'

import "./style.css"

export default class Player extends React.Component {
  state = {
    options: {
      poster: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=854361313,3188166359&fm=26&gp=0.jpg",
      sources: [{
        type: "video/mp4",
        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      }],
      subtitles: [{
          language: 'pt-br',
          url: "https://feawesome.github.io/react-awesome-player/en.vtt",
          label: "PT-BR"
      }],
      defaultSubtitle: 'pt-br'
    }
  }

  render() {
    const { options } = this.state
    return <div className="test-demo">
      <ReactAwesomePlayer options={options}/>
    </div>
  }
}
