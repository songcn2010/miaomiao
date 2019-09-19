<template>
  <div id="main">
    <Header title='我的喵喵' />
    <div id="content">
        <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default {
  name: 'mine',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>
