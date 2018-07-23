import React from 'react'
import { post } from 'axios';

class CreateSop extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file: null,
      title: '',
      department: '',
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
    formData.append('title', title)
    formData.append('department', department)
    formData.append('version', version)
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
        <label htmlFor="title">Title</label>
        <input type="text" 
                className="form-control" 
                name="title"
                id="title"
                value={this.state.title} 
                onChange={this.handleInputChange} />
      </div>
      
      <div className="form-group">
        <label htmlFor="sop-name">Department</label>
        <select className="form-control" name="department" id="department"
                value={this.state.department} 
                onChange={this.handleInputChange}>
          <option value="" disabled></option>
          <option value="Product Planning & Pricing">Product Planning & Pricing</option>
          <option value="Product Design">Product Design</option>
          <option value="Regulations, Conversions & Accessories">Regulations, Conversions & Accessories</option>
          <option value="Vehicle Evaluation">Vehicle Evaluation</option>
          <option value="Connected Vehicle Services">Connected Vehicle Services</option>
          <option value="Technical administration">Technical administration</option>
        </select>
      </div>

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

      <button className="btn btn-secondary" type="submit">Create SOP</button>
      </form>
   )
  }
}



export default CreateSop