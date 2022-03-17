<template>
  <div id="app-main">
    <navbar></navbar>
    <div class="download_area">
      <el-row class="row_area">
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To CSV</span>
              <el-button class="download_btn" @click="downloadFile('csv')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Json</span>
              <el-button class="download_btn" @click="downloadFile('json')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Xml</span>
              <el-button class="download_btn" @click="downloadFile('xml')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Markdown</span>
              <el-button class="download_btn" @click="downloadFile('md')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
      </el-row>
      <el-row class="row_area">
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Yaml</span>
              <el-button class="download_btn" @click="downloadFile('yaml')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Mysql</span>
              <el-button class="download_btn" @click="downloadFile('sql')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
        <el-col class="col_area" :span="6">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Html</span>
              <el-button class="download_btn" @click="downloadFile('html')"
                >Download</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              
            </div>
          </el-card></el-col
        >
      </el-row>
    </div>
  </div>
</template>
 
<script>
import Navbar from "../../components/navbar.vue";
import { JsonToCsv } from "../../common/util/toOutput/toFiles/JsonToCsv";
import { JsonToHtml } from "../../common/util/toOutput/toFiles/JsonToHtml";
import { JsonToMarkdown } from "../../common/util/toOutput/toFiles/JsonToMarkdown";
import { JsonToMysql } from "../../common/util/toOutput/toFiles/JsonToMysql";
import { JsonToXml } from "../../common/util/toOutput/toFiles/JsonToXml";
import { JsonToYaml } from "../../common/util/toOutput/toFiles/JsonToYaml";
import { JsonToJson } from "../../common/util/toOutput/toFiles/JsonToJson";

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
    },
    downloadFile(fileFormat) {
      switch (fileFormat) {
        case "csv":
          new JsonToCsv(this.show);
          break;
        case "json":
          new JsonToJson(this.show);
          break;
        case "html":
          new JsonToHtml(this.show);
          break;
        case "md":
          new JsonToMarkdown(this.show);
          break;
        case "sql":
          new JsonToMysql(this.show);
          break;
        case "xml":
          new JsonToXml(this.show);
          break;
        case "yaml":
          new JsonToYaml(this.show);
          break;
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .download_area {
    margin: 0px 30px;

    .row_area {
      margin-top: 20px;

      .col_area {
        padding: 0 20px;

        .download_btn {
          float: right;
          padding: 3px 0;
          margin-top: -5px;
          width: 80px;
          height: 30px;
        }
      }
    }
  }
}
</style>