import _ from 'lodash'
import React from 'react'
import Sidebar from './Sidebar'
import VideoAdd from '../components/VideoAdd'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { videoStorage: { boards: [], videos: [] } }
    this.addBoard = this.addBoard.bind(this)
    this.addVideo = this.addVideo.bind(this)
  }

  componentWillMount() {
    const localVideoStorage = localStorage.videoStorage

    if (localVideoStorage) {
      this.setState({ videoStorage: JSON.parse(localVideoStorage) })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentVideoStorage = this.state.videoStorage

    if (JSON.stringify(prevState.videoStorage) !== JSON.stringify(currentVideoStorage)) {
      localStorage.videoStorage = JSON.stringify(currentVideoStorage)
    }
  }

  addBoard(name) {
    const currentVideoStorage = this.state.videoStorage

    if (currentVideoStorage.boards.indexOf(name) === -1) {
      this.setState({
        videoStorage: {
          boards: [ ...currentVideoStorage.boards, name ],
          videos: currentVideoStorage.videos
        }
      })
    } else {
      console.log('FAIL: Board exists')
    }
  }

  addVideo(video) {
    const currentVideoStorage = this.state.videoStorage

    if (!_.find(currentVideoStorage.videos, o => {return o.videoData.id === video.videoData.id})) {
      this.setState({
        videoStorage: {
          boards: currentVideoStorage.boards,
          videos: [ ...currentVideoStorage.videos, video ]
        }
      })
    } else {
      console.log('FAIL: Video exists')
    }
  }

  render() {
    const currentVideoStorage = this.state.videoStorage

    return (
      <div className="row">
        <div className="col-sm-3">
          <Sidebar boardsList={currentVideoStorage.boards} onSubmitBoard={this.addBoard} />
        </div>
        <div className="col-sm-9">
          <VideoAdd className="col-sm-9" onSubmitVideo={this.addVideo} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Index
