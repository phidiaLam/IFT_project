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

export default {
  name: "Home",
  data() {
    return {
      formats: ["csv","json","xml","yaml"]
    };
  },
  components: {
    Navbar,
  },
  methods: {
    importData(file) {
      let suffixIndex = file.name.lastIndexOf(".");
      let fileSuffix = file.name.substr(suffixIndex + 1);
      if (!this.formats.includes(fileSuffix.toLowerCase())) {
        this.$message({
          message: `The file format "${fileSuffix}" is not accepted`,
          type: 'warning',
          offset: 80
        });
        return 
      }
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