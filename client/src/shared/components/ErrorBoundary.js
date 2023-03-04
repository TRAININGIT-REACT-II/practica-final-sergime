import { Component } from "react";


class ErrorBoundary extends Component {

  constructor (props) {
    super(props)

    this.state = {
      error: false
    }
  }

  static getDerivedStateFromError () {
    return {
      error: true,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidCatch () {
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
            onClick={ handleClick }
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