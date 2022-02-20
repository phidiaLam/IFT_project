
<template>
  <div class="navbar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/"><a href="/">Home</a></el-menu-item>
    </el-menu>
  </div>
</template>
 
<script>
export default {
  name: "Navbar",
};
</script>
 
<style scoped>
a {
  text-decoration: none;
}
</style>