import Vue from 'vue';
import MessageBox from './MessageBox/MessageBox'

export var messageBox = (function () {
  var defaults = { //设定默认值
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  };

  var mycomponent = Vue.extend(MessageBox);


  return function (opts) {

    for (var attr in opts) {
      defaults[attr] = opts[attr];
    }


    var vm = new mycomponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel() {
          defaults.handleCancel && defaults.handeCancel.call(this);
          document.body.removeChild(vm.$el)
        },
        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el)
        }
      }
    });

    document.body.appendChild(vm.$el)

  }

})()
