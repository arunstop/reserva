<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
};
</script>

<template>
  <div>
    <span>{{ count }}</span>
    <button @click="increment">PLUS</button>
    <button @click="decrement">MINUS</button>
  </div>
</template>
