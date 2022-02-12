
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-button>button</el-button>
      <el-button type="primary">button</el-button>
      <el-button type="success">button</el-button>
      <el-button type="info">button</el-button>
      <el-button type="warning">button</el-button>
      <el-button type="danger">button</el-button>
    </el-row>
  </div>
</template>
 
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "element-ui test",
    };
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>