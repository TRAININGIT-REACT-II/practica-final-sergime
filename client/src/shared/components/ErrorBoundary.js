import { Component } from "react";


class ErrorBoundary extends Component {

  constructor (props) {
    super(props)

    this.state = {
      error: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  static getDerivedStateFromError () {
    return {
      error: true,
    }
  }

  componentDidCatch (error, info) {
    console.log(error, info)
  }

  handleClick () {
    if (typeof this.props.onReset === 'function') {
      this.props.onReset()
    }
    this.setState({ error: false })
  }

  render () {
    if (this.state.error) {
      return (
        <section>
          <h1>{ this.props.message }</h1>
          <button
            onClick={ this.handleClick }
            className="btn btn-primary"
          >
            Reintentar
          </button>
        </section>
      )
    }

    return this.props.children
  }

}

export default ErrorBoundary