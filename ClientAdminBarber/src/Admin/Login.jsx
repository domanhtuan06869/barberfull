import React, { Component } from 'react';
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
       localStorage.setItem('email',this.state.email)
        this.props.history.push('/admin');
        localStorage.setItem('email',this.state.email)
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      alert('Lỗi đăng nhập làm ơn thử lại');
    });
  }

  render() {
    return (
      
     
      <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3"><i class="fas fa-sign-in-alt"></i>Đăng nhập</h1>
         
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div class="form-group">
              <label for="password">Mật khâu</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
            <p onClick={()=>  this.props.history.push('/signup')} style={{textAlign:'center' , cursor:'pointer',color:'blue',marginTop:20}}>Đăng kí</p>

          </form>
        </div>
      </div>
    </div>
    );
  }
}