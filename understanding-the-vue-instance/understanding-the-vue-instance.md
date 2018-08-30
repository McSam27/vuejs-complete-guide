# understanding the vue instance

Think of the Vue instance as the middle man of communicating our application data to normal HTML.

You can have more than just one Vue instance. But, each instance can only target one HTML DOM element. Also, all methods, data, etc are scoped to the DOM selector it targets.

```js
new Vue({
  el: "#app",
  data: {
    title: "The VueJS Instance",
    showParagraph: false
  },
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle("The VueJS Instance (Updated)");
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
  computed: {
    lowercaseTitle: function() {
      return this.title.toLowerCase();
    }
  },
  watch: {
    title: function(value) {
      alert("Title changed, new value: " + value);
    }
  }
});
```

You **can** access your Vue instance data from an external source. But, most of the time you can combine both instances into just one.

You also have the option to store the Vue instance in a variable. The variable is usually called, `vm` to represent 'vue-model'. Data, methods, computed, watchers, etc are all proxied on the instance and are available directly on the first level of the instance variable.

```js
var vm1 = new Vue({...});
var vm2 = new Vue({...}); // within the vm2 you can access data from the vm1.<DATA_VARIABLE>
```

## VueJS and how it manages your data

VueJS attaches the properties of the Vue instance to the overall global Vue instance. It creates a proxy when the instance is created with all the object properties.

It also sets up 'watchers' to watch over properties changing, by creating `getter` and `setter` functions to access and watch the object properties.

You cannot add new properties from outside of the Vue instance. This is because these properties were not attached to the Vue instance at it's creation time and therefore, Vue did not set up an `getter` or `setter` functions for these variables.

```js
var vm = new Vue ({...});

// This does not work
vm.newProp = 'newProp';
```

## A Closer look at `$el` and `$data`

`$el` - refers to the template where the Vue instance scope exists
`$data` - is a proxy that you can access the `data` object on the Vue instance

```js
var vm = new Vue({
  el: "#app",
  data: {
    name: "Sam McCagg"
  }
});

console.log(vm.$data.name); // "Sam McCagg"
```

This means that the you can access the Vue instance properties in normal Javascript code. You aren't limited to using the data only in the Vue instance.

## $ref

`ref` is a key that VueJs recognizes that can be placed on any element within the vue instance scope.
When changing the value of a native HTML DOM element with the `$refs` key, its value is not reactive.
It isn't part of the Vue instance.

Useful when accessing a native element, or you need the value of the element.

```html
<button @click="show" ref="myButton">
```

```js
new Vue({
  el: "#app",
  data: {
    title: "The VueJS Instance",
    showParagraph: false
    console.log(this.$refs); // => { myButton: button }
    console.log(this.$refs.myButton); // => { ... } all of button properties
    this.$refs.myButton.innerText = "I can access you";
  },
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle("The VueJS Instance (Updated)");
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
});
```

## Mounting a Template

\* Properties on the Vue instance object that are prefixed with the `$` are native VueJs methods and properties available.

Utilized the `vm.$mount()` is good when you don't know where exactly you need to mount the application and you need to do configuration to the instance prior to the mounting.

```js
var vm = new Vue({
  // REMOVED THE el PROPERTY
  data: {
    title: "The VueJS Instance",
    showParagraph: false
    console.log(this.$refs); // => { myButton: button }
    console.log(this.$refs.myButton); // => { ... } all of button properties
    this.$refs.myButton.innerText = "I can access you";
  },
  methods: {
    show: function() {
      this.showParagraph = true;
      this.updateTitle("The VueJS Instance (Updated)");
    },
    updateTitle: function(title) {
      this.title = title;
    }
  },
});

vm.$mount('#app');
```

```js
// HTML
<div id="app3" />;

// JS
var vm2 = new Vue({
  template: "<h1>Hello World.</h1>"
});

vm2.$mount("#app3"); // renders the template
vm2.mount();
document.getElementById("app3").appendChild(vm2.$el); // append the $el (the Vue instance as a child of the #app3 div)

// HTML
<hello></hello>
<hello></hello>
<hello></hello>
<div class="hello"></div>
// JS
var vm3 = new Vue({
  el: 'hello',
  template: "<span>Hello World.</span>"
});
var vm4 = new Vue({
  el: '.hello',
  template: "<span>Hello World.</span>"
});

// these Vue instances will only render within the first instance of the document query selector
```

## Using Components

Vue allows us to create reusable components. You can use the `Vue.component()` method on the Vue instance to create a component using a template and can be reused throughout the Vue instance scope.

```js
// HTML
<hello></hello>
<hello></hello>

// JS
// This code will render a h1 with "Hello" in it both times
Vue.component("hello", {
  template: "<h1>Hello</h1>"
});
```

## Limitations of Templates

There are a few limitations of templates:

- HTML naming conventions
- precompiled vs full Vue version

## How Vue updates the DOM

Vue is only updating parts of the real DOM at a time.
Vue sets up a watcher for each property within the Vue instance.

Javascript is super fast; however accessing the real DOM is quite expensive (CPU and memory) to do. So constantly comparing and updating the real DOM is not performant at all.

It actually has a **virtual DOM**. This is where Vue (Javascript) compares what parts of the application needs to get updated.

If a data property gets updated, Vue checks for differences between the Vue instance and the Virtual DOM. Now, Vue knows what specific parts of the application it needs to update within the real DOM.
It then performs the update to the real DOM.

This is what makes Vue (and React) fast; it lessens the burden on the CPU and usage by making smart diff's of the instance data and the virtual DOM (which in turn affects the real DOM).

## Vue Instance Lifecycle

1. `new Vue()`
1. `beforeCreate()`
   1. then initializes the data and events of the instance
   1. then, the instance is created
1. `created()`
   1. compiles or dervices the template (depending on the use of `el` or `mount()`)
1. `beforeMount()`
   1. replace `el` with compiled template
1. mounted to the DOM (javascript is compiled down to real HTML elements)

If data is changed:

1. `beforeUpdate()`
   1. perform calculations of what specific parts of application to re-render
   1. re-render changed DOM
1. `updated()`
1. `beforeDestroy()`
1. `destroyed()`

## Instance Lifecycle in Practice

```html
<button @click="title ='changed'">Update Title</button>
<button @click="destroy">Destroy Instance</button>
```

```js
new Vue({
  el: "#app",
  data: {
    title: "My VueJS Application"
  },
  methods: {
    destroy: function() {
      this.$destroy(); // You access the Vue properties with the "$"-syntax
    }
  },
  // Initial Clean up tasks
  beforeCreate: function() {
    console.log("beforeCreated()");
  },
  created: function() {
    console.log("created()");
  },
  beforeMount: function() {
    console.log("beforeMount()");
  },
  mounted: function() {
    console.log("mounted()");
  },
  beforeUpdate: function() {
    console.log("beforeUpdate()");
  },
  updated: function() {
    console.log("updated()");
  },
  beforeDestroy: function() {
    console.log("beforeDestroy()");
  },
  // Clean up tasks
  destroyed: function() {
    console.log("destroyed()");
  }
});
```
