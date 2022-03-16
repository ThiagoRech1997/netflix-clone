import React from 'react'
import ReactAwesomePlayer from 'react-awesome-player'

import "./style.css"

export default class Player extends React.Component {
  state = {
    options: {
      poster: "",
      sources: [{
        type: "video/mp4",
        src: "http://172.16.0.16:3001/stream"
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
