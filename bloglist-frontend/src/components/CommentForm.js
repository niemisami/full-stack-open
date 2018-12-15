import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap'
import { create } from '../actions/commentActions'

class CommentForm extends PureComponent {
  onSubmit = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    this.props.create({ content: comment })
    event.target.comment.value = ''
  }

  render() {
    return (
      <Row>
        <Col>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input className='form-input'
                name='comment'
                placeholder='Comment' />
            </FormGroup>
            <Button outline color='primary' type="submit">Add</Button>
          </Form>
        </Col>
      </Row>
    )
  }

  static propTypes = {
    create: PropTypes.func.isRequired
  }
}

const mapDispatchToProps = (dispatch, { blog }) => ({
  create: comment => dispatch(create(blog, comment))
})

export default connect(null, mapDispatchToProps)(CommentForm)