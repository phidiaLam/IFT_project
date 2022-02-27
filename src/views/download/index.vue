<template>
  <div id="app-main">
    <navbar></navbar>
    <el-row class="change_area">
      <el-col :span="16"> dfsdffd</el-col>
      <el-col :span="8">
        <div class="show_box">
          <el-input type="textarea" autosize v-model="show" disabled>
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import Navbar from "../../components/navbar.vue";
import xml2js from "xml-js";
import yaml from "js-yaml";

export default {
  name: "Download",
  data() {
    return {
      show: "",
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.show = localStorage.getItem("json");
      let json = JSON.parse(this.show);
      //   var options = { compact: true, ignoreComment: true, spaces: 4 };
      //   var result = xml2js.json2xml(json, options);
      let result = yaml.dump(json);
      console.log(result);
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
}
</style>