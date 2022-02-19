import React from 'react'
import ReactAwesomePlayer from 'react-awesome-player'

import "./style.css"

export default class Player extends React.Component {
  state = {
    options: {
      poster: "",
      sources: [{
        type: "video/mp4",
        src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      }],
      subtitles: [{
          language: 'pt-br',
          url: "",
          label: "PT-BR"
      }],
      defaultSubtitle: 'pt-br'
    }
  }

  render() {
    const { options } = this.state
    return( 
    <div className="test-demo">
      <ReactAwesomePlayer options={options}/>
    </div>
    )
  }
}
