import React from 'react'
import { connect } from 'react-redux'
import * as libraryActions from '../actions/libraryActions'

const mapStateToProps = (state, ownProps) => {
  return {
    isBookAdded: state.isBookAdded,
    loading : state.loading,
    closeModal : ownProps.closeModal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (title, author, publisher, imageUrl, description, genre) => {
      dispatch(libraryActions.addBook(title, author, publisher, imageUrl, description, genre))
    }
  }
}

export class BooksForm extends React.Component {
  constructor (props) {
    super(props)
    this.newBook = {
      title: '',
      author: '',
      publisher: '',
      imageUrl : '',
      description: '',
      genre: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if(!nextProps.loading.addBooksLoading) {
      nextProps.closeModal();
    }
  }
  addBook () {
    const title = this.newBook.title.value
    const author = this.newBook.author.value
    const publisher = this.newBook.publisher.value
    const imageUrl = this.newBook.imageUrl.value
    const description = this.newBook.description.value
    const genre = this.newBook.genre.value
    this.props.addBook(title, author, publisher, imageUrl, description, genre)
  }
  render () {
    return (
      <form className='form-horizontal' ref='bookForm' onSubmit={(e) => {
        e.preventDefault()
        this.addBook()
        this.refs.bookForm.reset()
      }}>
        <fieldset>
          <legend>
            Add a book
            <span className='glyphicon glyphicon-remove close-btn' onClick={() => this.props.closeModal()}></span>  
          </legend>
          {
            this.props.loading.addBooksLoading 
            ? <div className="form-group">
                <p className="text-center text-info">
                  Adding a new book.
                </p>
              </div>
            : ''
          }
          <div className='form-group'>
            <label htmlFor='title' className='col-sm-3 control-label'>Title</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='title' placeholder='Tite' ref={(node) => { this.newBook.title = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='author' className='col-sm-3 control-label'>Author</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='author' placeholder='Author' ref={(node) => { this.newBook.author = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='publisher' className='col-sm-3 control-label'>Publisher</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='publisher' placeholder='Publisher' ref={(node) => { this.newBook.publisher = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='imageUrl' className='col-sm-3 control-label'>Image URL</label>
            <div className='col-sm-9'>
              <input type='url' className='form-control' id='imageUrl' placeholder='Image URL' ref={(node) => { this.newBook.imageUrl = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='description' className='col-sm-3 control-label'>Description</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='description' placeholder='Description' ref={(node) => { this.newBook.description = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='genre' className='col-sm-3 control-label'>Genre</label>
            <div className='col-sm-9'>
              <input type='text' className='form-control' id='genre' placeholder='Genre' ref={(node) => { this.newBook.genre = node }} required/>
            </div>
          </div>
          <div className='form-group'>
            <div className='text-center'>
              <button type='submit' className='btn btn-default'>Add</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm)