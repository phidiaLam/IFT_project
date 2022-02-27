<template>
  <div id="app-main">
    <navbar></navbar>
    <el-row class="change_area">
      <el-col :span="16">
        <el-button @click="toDownload">download</el-button>
      </el-col>
      <el-col :span="8">
        <div class="show_box">
          <json-viewer
            :value="jsonFormat"
            :expand-depth="4"
            expanded
            copyable
            boxed
          ></json-viewer>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import { FilesToJson } from "../../common/util/toJson/FilesToJson";
import { JsonToJson } from "../../common/util/toJson/filesTo/JsonToJson";
import { CsvToJson } from "../../common/util/toJson/filesTo/CsvToJson";
import { XmlToJson } from "../../common/util/toJson/filesTo/XmlToJson";
import { YamlToJson } from "../../common/util/toJson/filesTo/YamlToJson";
import Navbar from "../../components/navbar.vue";
import JsonViewer from "vue-json-viewer";

export default {
  name: "InteractiveFile",
  data() {
    return {
      changeTool: new FilesToJson(),
      jsonFormat: {},
    };
  },
  components: {
    Navbar,
    JsonViewer,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (
        localStorage.getItem("value") != null &&
        localStorage.getItem("type") != null
      ) {
        let type = localStorage.getItem("type");

        // determine the different file types, using different classes
        switch (type) {
          case "json":
            this.changeTool = new JsonToJson(localStorage.getItem("value"));
            break;
          case "csv":
            this.changeTool = new CsvToJson(localStorage.getItem("value"));
            break;
          case "xml":
            this.changeTool = new XmlToJson(localStorage.getItem("value"));
            break;
          case "yaml":
            this.changeTool = new YamlToJson(localStorage.getItem("value"));
            break;
        }
        // use method in the class to change file data to json format
        this.changeTool.changeToJson().then((_) => {
          this.jsonFormat = JSON.parse(
            JSON.stringify(this.changeTool.jsonText)
          );
          console.log(this.jsonFormat);
        });

        // remove the item in the local storage
        localStorage.removeItem("value");
        localStorage.removeItem("type");
      } else {
        // if has not value in the local storage, redirect to home page.
        this.$router.push("/");
      }
    },
    toDownload() {
      localStorage.setItem("json", JSON.stringify(this.jsonFormat));
      this.$router.push("/download");
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .change_area {
    margin-top: 5px;
    .show_box {
      border: 3px solid #5e5252;
      border-radius: 5px;
      height: calc(100vh - 90px);
      overflow: scroll;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
    }

    ::-webkit-scrollbar {
      width: 0 !important;
      height: 0;
    }
  }
}
</style>