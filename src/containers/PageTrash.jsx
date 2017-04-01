import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { emptyTrash } from '../actions'
import './PageTrash.css'
import VideoItem from '../components/VideoItem'

const propTypes = {
  boards: React.PropTypes.array.isRequired,
  videos: React.PropTypes.array.isRequired,
  emptyTrash: React.PropTypes.func.isRequired
}

const defaultProps = {
  boards: [],
  videos: [],
  emptyTrash: () => console.warn('emptyTrash not defined')
}

const contextTypes = {
  router: React.PropTypes.object
}

class PageTrash extends React.Component {
  constructor(props) {
    super(props)
    this.handleEmptyClick = this.handleEmptyClick.bind(this)
  }

  handleEmptyClick() {
    if (confirm(`Empty trash?`)) {
      this.props.emptyTrash()
      this.context.router.push('/')
    }
  }

  render() {
    const mapToComponent = videos => {
      return videos.map(video => {
        return video.deleted && <VideoItem video={video} key={video.data.id} />
      })
    }

    return (
      <section className="Page">
        <header className="PageHeader">
          <h1 className="PageTitle">Trash</h1>
        </header>

        <main className="PageContent">
          <div className="PageContentInner">
            <article className="Card">
              <header className="CardHeader" style={{ textAlign: 'right' }}>
                <button className="btn-link btn-small" onClick={this.handleEmptyClick}>Empty</button>
              </header>

              <div className="CardScroll">
                {mapToComponent(this.props.videos)}
              </div>
            </article>
          </div>
        </main>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return { boards: state.boards, videos: state.videos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ emptyTrash }, dispatch)
}

PageTrash.propTypes = propTypes
PageTrash.defaultProps = defaultProps
PageTrash.contextTypes = contextTypes

export default connect(mapStateToProps, mapDispatchToProps)(PageTrash)
