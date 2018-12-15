import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'
import { create } from '../actions/blogActions'
import { ReactComponent as AddIcon } from '../icons/add-outline.svg'

class BlogForm extends PureComponent {
  onSubmit = event => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    this.props.create(blog)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  render() {
    return <Row className='reveal-1'>
      <Col className='block' sm='12' md={{ size: 6, offset: 3 }}>
        <h2>
          <AddIcon width='22' height='22' className='svg-icon' /> Add new blog
    </h2>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              className='form-input'
              placeholder='Title'
              name='title' />
          </FormGroup>
          <FormGroup>
            <Input
              className='form-input'
              placeholder='Author'
              name='author' />
          </FormGroup>
          <FormGroup>
            <Input
              className='form-input'
              placeholder='URL'
              name='url' />
          </FormGroup>
          <Button outline color='primary' type="submit">Save</Button>
        </Form>
      </Col>
    </Row>
  }

  static propTypes = {
    create: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = ({
  create
})

export default connect(null, mapDispatchToProps)(BlogForm)
