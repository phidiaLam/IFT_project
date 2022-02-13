<template>
  <div id="app-main">
    <navbar></navbar>
    <el-upload
      drag
      :auto-upload="false"
      action="#"
      :on-change="importData"
      ref="upload"
      accept="application/json"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drag the file here, or <em>click to upload</em>
      </div>
    </el-upload>
  </div>
</template>
 
<script>
import Navbar from "../../components/navbar.vue";

export default {
  name: "Home",
  data() {
    return {
      fileData: "",
    };
  },
  components: {
    Navbar,
  },
  methods: {
    importData(file) {
      var suffixIndex = file.name.lastIndexOf(".");
      var fileSuffix = file.name.substr(suffixIndex + 1);
      //输出结果
      console.log(fileSuffix);
      const reader = new FileReader();
      reader.onload = (res) => {
        const { result } = res.target; // get the string from files
      };
      reader.readAsText(new Blob([file.raw]), "utf-8"); // Parse using UTF-8
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
}
</style>