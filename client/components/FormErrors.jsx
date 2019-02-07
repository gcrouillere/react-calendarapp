import React from "react"

class FormErrors extends React.Component {

  render () {
    return (
      <div>
        {Object.keys(this.props.formErrors).map((formErrorField) => {
          return (
            this.props.formErrors[formErrorField].map((error) => {
              return (
                <p>{formErrorField} : {error}</p>
              )
            })
          )
        })}
      </div>
    );
  }
}

export default FormErrors
