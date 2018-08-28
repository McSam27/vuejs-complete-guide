new Vue({
  el: '#exercise',
  data: {
    effectClasses: {
      highlight: true,
      shrink: false,
    },
    classA: "test-class-a",
    classB: "test-class-b",

  },
  methods: {
    startEffect: function () {
      var vm = this;
      setTimeout(function () {
        vm.effectClasses.highlight = !vm.effectClasses.highlight;
        vm.effectClasses.shrink = !vm.effectClasses.shrink;
      }, 1500)
    }
  }
});