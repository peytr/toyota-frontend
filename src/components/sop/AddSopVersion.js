import React from 'react'
import axios, { post } from 'axios';

class AddSopVersion extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      file: null,
      version: '',
      author: '',
      createdAt: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit(e){
    e.preventDefault()
    const {file, title, department, version, author, createdAt} = this.state
    this.fileUpload(file, title, department, version, author, createdAt).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file, title, department, version, author, createdAt){
    const url = `${process.env.REACT_APP_BACKEND_URL}/sops`;
    const formData = new FormData();
    formData.append('file', file)
    formData.append('author', author)
    formData.append('createdAt', createdAt)
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
      <div className="form-group">
        <label htmlFor="version">Version</label>
        <input type="number" 
              className="form-control" 
              id="version"
              name="version" 
              min="1" 
              step="1" 
              value={this.state.version} 
              onChange={this.handleInputChange} />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input type="text" 
              name="author" id="author"
              className="form-control" 
              value={this.state.author} 
              onChange={this.handleInputChange} />
      </div>


      <div className="form-group">
        <label htmlFor="createdAt">Date Created</label>
        <input type="date" className="form-control" id="createdAt" name="createdAt"
        value={this.state.createdAt} 
        onChange={this.handleInputChange}
        />
      </div>

      <div className="form-group">
        <input type="file" className="form-control-file" onChange={this.onChange} />
      </div>

      <button className="btn btn-primary" type="submit">Create SOP</button>
      </form>
   )
  }
}



export default AddSopVersion