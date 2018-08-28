# Vue JS 2 - The Complete Guide

Options for Vue Instance:

- `el`: connect the vue instance to the HTML DOM.
  - you usually used to find the wrapping DOM element that will enclose the Vue app
- `data: {}`: used to store data that can be used within the app or component
- `methods: {}`: is the location where the logic goes
- `computed: {}`: is the data values that are dependent on other data within the application
  - this is where you place 'reactive' data
- `watch: {}`: is where code is executed upon data changing

> Section 2 - Lesson 23

`computed` properties of are great to watch over properties and _react_ when things change. It also helps with reducing code.
You cannot reference other `data.properties` within the same data `{}` on the Vue instance or component.
You will have to create a `computed: {}` that watches over the property. It is where you put values that are dependent on other values.
Computed properties are smart-checking properties that only will run if one dependent values change. They are more performant than the `watch` object.
Computed properties are synchronous.

_Watch is where you place asynchronous actions or logic._

```js
new Vue({
  el: "#app",
  data: {
    counter: 0
  },
  computed: {
    output: function() {
      return this.counter > 5 ? "> 5" : "< 5";
    }
  },
  watch: {
    counter: function(value) {
      var vm = this;
      setTimeout(function() {
        vm.counter = 0;
      }, 2000);
    }
  },
  methods: {}
});
```

Shorthands for `v-on:` and `v-bind:`

```html
<button v-on:click="increment">Increment</button>
<input v-bind:value="inputValue"/>
<button @click="increment">Increment</button>
<input :value="inputValue"/>
```

Attach classes to DOM elements

`:class` => conditionally applies a class

- with one data variable
- objects
- array of values

`:style` => conditionally applies the inline styles

- can use computed variables (as well as static data variables)

```html
// html
<div :class="{red: attachRed}"></div>
<div :class="divClasses"></div>
<div :class="[color, { red: attachRed }]"></div>
<input type="text" v-model="color"/>

// both work
<div :style="{backgroundColor: color}"></div>
<div :style="{'background-color': color}"></div>
<div :style="{'width': width + 'px'}"></div>
```

```js
// vuejs
new Vue({
  el: "#app",
  data: {
    attachRed: false,
    color: "green",
    width: 100
  },
  computed: {
    divClasses: function() {
      return {
        red: this.attachRed,
        blue: !this.attachRed
      };
    }
  }
});
```

`v-if` will conditionally render the DOM element

- if it is false, then NOTHING will be rendered to the DOM (only HTML comments). It isn't just hidden with `display:none;`.

`v-else` will automatically refer to the last `v-if`, and will render if the comparative variable if falsy.

In Vue 2.1.x, the directive `v-else-if` was introduced.

```html
<p v-if="show">You can see me!</p>
<p v-else-if="showThis">Maybe, I can show this.</p>
<p v-else>Now you see ME!</p>

<!-- Can be used to wrap a larger amount of DOM elements -->
<template v-if="show">
<div>Test</div>
<input type="text" v-model="color"/>
</template>
```

`v-show` behaves similiar to `v-if`, however it _does_ apply a `display: none;`. It isn't detached from the HTML. It is simply hidden via CSS styles.

In most cases, you will want to use `v-if`, since it completely removes the element from the DOM. This leads to better performance.

`v-for` is used when you want to iterate over a list or items to render. You can also use a `<template>`.

It is suggested to send in a `key` for elements being rendered in the `v-for`.

```html
<div id="app">
  <ul>
    <li v-for="(ingredient, index) in ingredients">{{ingredient}} - at index: {{ index }}</li>
  </ul>
  <hr>
  <ul>
    <li v-for="person in persons">
    <!-- Will output the key / name of the object property -->
      <span v-for="(value, key, index) in person"> {{ value }} - key: {{ key }} - index: {{ index }}</span>
    </li>
  </ul>
  <hr>
  <template v-for="(ingredient, index) in ingredients">
  <h1>{{ ingredient }}</h1>
  <p>{{ index }}</p>
  </template>

  <!-- Output this 1 - 10. NOTE: NOT ZERO BASED -->
  <span v-for="n in 10">{{ n }}</span>



</div>
```

```js
new Vue({
  el: "#app",
  data: {
    ingredients: ["meat", "fruit", "cookies"],
    persons: [
      { name: "Max", age: 27, color: "red" },
      { name: "Anna", age: "unknown", color: "blue" }
    ]
  }
});
```
