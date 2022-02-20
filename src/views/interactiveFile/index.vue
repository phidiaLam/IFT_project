<template>
  <div id="app-main">
    <navbar></navbar>
    {{ jsonText }}
  </div>
</template>
 
<script>
import { FilesToJson } from "../../common/util/toJson/FilesToJson";
import { JsonToJson } from "../../common/util/toJson/filesTo/JsonToJson";
import { CsvToJson } from "../../common/util/toJson/filesTo/CsvToJson";
import { SqlToJson } from "../../common/util/toJson/filesTo/SqlToJson";
import { XmlToJson } from "../../common/util/toJson/filesTo/XmlToJson";
import { YamlToJson } from "../../common/util/toJson/filesTo/YamlToJson";
import Navbar from "../../components/navbar.vue";

export default {
  name: "InteractiveFile",
  data() {
    return {
      changeTool: new FilesToJson(),
      jsonText: "",
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
      if (
        localStorage.getItem("value") != null &&
        localStorage.getItem("type") != null
      ) {
        let type = localStorage.getItem("type");

        // determine the different file types, using different classes
        switch (type) {
          case "json":
            this.changeTool = new JsonToJson(localStorage.getItem("value"));
          case "csv":
            this.changeTool = new CsvToJson(localStorage.getItem("value"));
          case "xml":
            this.changeTool = new XmlToJson(localStorage.getItem("value"));
          case "yaml":
            this.changeTool = new YamlToJson(localStorage.getItem("value"));
          case "sql":
            this.changeTool = new SqlToJson(localStorage.getItem("value"));
        }
        // use method in the class to change file data to json format
        this.changeTool.changeToJson();
        this.jsonText = this.changeTool.jsonText;

        // remove the item in the local storage
        localStorage.removeItem("value");
        localStorage.removeItem("type");
      } else {
        // if has not value in the local storage, redirect to home page.
        this.$router.push("/");
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
}
</style>