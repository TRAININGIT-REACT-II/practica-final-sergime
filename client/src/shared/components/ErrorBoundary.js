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
  }

  componentDidCatch () {
    console.log(error, info)
  }

  render () {
    if (this.state.error) {
      return (
        <section>
          <h1>{ this.props.message }</h1>
        </section>
      )
    }

    return this.props.children
  }

}

export default ErrorBoundary