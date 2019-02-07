import moment from 'moment';

export const validations = {
  checkMinLength: function(text, minLength) {
     return(text.length < minLength ? `length should be at least ${minLength} characters` : '')
  },

  timeShouldBeInTheFuture: function (t) {
    return(moment(t).isValid() && moment(t).isAfter() ? '' : 'can\'t be in the past')
  }
}
