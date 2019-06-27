import React from 'react'

import { Card, CardHeader, CardBody } from 'reactstrap'

const Post = ({
  data: {
    title,
    body,
    author: { name },
    published
  }
}) => {
  return (
    <Card style={{ margin: '30px auto', width: '100%' }}>
      <CardHeader style = {{display: 'flex', justifyContent: 'space-between'}}>
        <span>{title}</span>
        <span>{`published: ${published}`}</span>
      </CardHeader>
      <CardBody>
        {body || <p style={{ opacity: 0.5 }}>No body for this post...</p>}
      </CardBody>
    </Card>
  )
}

export default Post
