import React from 'react'
import ArticlesContent from './article'
import CategoryContent from './category'
import ClassificationContent from './classification'
import TagContent from './tag'
import UserContent from './user'

class AdminContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let { cateIndex } = this.props
    cateIndex = Number(cateIndex)
    console.log(typeof cateIndex)
    let content
    if (cateIndex === 0) {
      content = <ArticlesContent />
    } else if (cateIndex === 1) {
      content = <CategoryContent />
    } else if (cateIndex === 2) {
      content = <ClassificationContent />
    } else if (cateIndex === 3) {
      content = <TagContent />
    } else {
      content = <UserContent />
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default AdminContent