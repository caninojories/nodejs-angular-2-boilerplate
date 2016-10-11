import {
  Modules
} from '../modules'

module.exports = Modules.get()
.$.notify.onError({
  title: "Compile Error",
  message: "<%= error.message %>"
});
