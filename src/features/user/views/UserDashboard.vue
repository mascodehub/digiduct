<script>
export default {
  data() {
    return {
      count: 0,
      total: 0,
      a: 0,
      b: 0,
    };
  },

  methods: {
    increment() {
      this.count++;
    },
    perkalian(x, y) {
      this.a = x;
      this.b = y;
      this.total = this.a * this.b;
    },
  },

  mounted() {
    console.log(`The initial count is ${this.count}.`);
  },
};
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
  <button @click="perkalian(5, 4)">Total is: {{ total }}</button>
</template>
