new Vue({
    el: '#exercise',
    data: {
        value: ''
    },
    methods: {
        showAlert: function () {
            alert("I'm an alert!");
        },
        getInput: function (event) {
            this.value = event.target.value;
        }
    }
});