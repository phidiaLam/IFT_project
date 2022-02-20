<template>
  <div id="app-main">
    <navbar></navbar>
    <el-upload
     class="upload_btn"
      drag
      :auto-upload="false"
      action="#"
      :on-change="importData"
      ref="upload"
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
import { JsonToJson } from "../../common/util/toJson/filesTo/JsonToJson";

export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {
    Navbar,
  },
  methods: {
    importData(file) {
      let suffixIndex = file.name.lastIndexOf(".");
      let fileSuffix = file.name.substr(suffixIndex + 1);
      localStorage.setItem("type", fileSuffix);
      const reader = new FileReader();
      reader.onload = (res) => {
        const { result } = res.target; // get the string from files
        localStorage.setItem("value", result);
      };
      reader.readAsText(new Blob([file.raw]), "utf-8"); // Parse using UTF-8
      this.$router.push("/interactiveFile")
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .upload_btn {
    text-align:center;
    margin-top: calc(50vh - 150px);
  }
}
</style>