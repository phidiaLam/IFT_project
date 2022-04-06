<template>
  <div id="app-main">
    <navbar></navbar>
    <div class="download-area">
      <el-row class="row-area">
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To CSV</span>
              <el-button class="download_btn" @click="downloadFile('csv')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Number of Files</span>

                <el-radio v-model="csvSettings.file" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="csvSettings.file" label="multiple"
                  >Multiple File</el-radio
                >
              </div>
              <div>
                <span class="card-label">Delimiter</span>

                <el-input
                  v-model="csvSettings.delimiter"
                  placeholder="Please input a symbol"
                  class="input-area"
                ></el-input>
              </div>
            </div> </el-card
        ></el-col>
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Json</span>
              <el-button class="download_btn" @click="downloadFile('json')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Structured Format</span>
                <el-switch v-model="jsonSettings.structured"> </el-switch>
              </div>
              <div v-if="jsonSettings.structured">
                <span class="card-label">Number of Files</span>

                <el-radio v-model="jsonSettings.file" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="jsonSettings.file" label="multiple"
                  >Multiple Files</el-radio
                >
              </div>
            </div>
          </el-card></el-col
        >
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Xml</span>
              <el-button class="download_btn" @click="downloadFile('xml')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Structured Format</span>
                <el-switch v-model="xmlSettings.structured"> </el-switch>
              </div>
              <div v-if="xmlSettings.structured">
                <span class="card-label">Number of Files</span>

                <el-radio v-model="xmlSettings.file" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="xmlSettings.file" label="multiple"
                  >Multiple Files</el-radio
                >
              </div>
            </div></el-card
          ></el-col
        >
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Markdown</span>
              <el-button class="download_btn" @click="downloadFile('md')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Number of Tables</span>

                <el-radio v-model="mdSettings.table" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="mdSettings.table" label="multiple"
                  >Multiple File</el-radio
                >
              </div>
            </div>
          </el-card></el-col
        >
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Yaml</span>
              <el-button class="download_btn" @click="downloadFile('yaml')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Structured Format</span>
                <el-switch v-model="yamlSettings.structured"> </el-switch>
              </div>
              <div v-if="yamlSettings.structured">
                <span class="card-label">Number of Files</span>

                <el-radio v-model="yamlSettings.file" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="yamlSettings.file" label="multiple"
                  >Multiple Files</el-radio
                >
              </div>
            </div>
          </el-card></el-col
        >
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Mysql</span>
              <el-button class="download_btn" @click="downloadFile('sql')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Number of Files</span>

                <el-radio v-model="sqlSettings.table" label="single"
                  >Single File</el-radio
                >
                <el-radio v-model="sqlSettings.table" label="multiple"
                  >Multiple File</el-radio
                >
              </div>
            </div>
          </el-card></el-col
        >
        <el-col class="col-area" :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>To Html</span>
              <el-button class="download_btn" @click="downloadFile('html')"
                >Download</el-button
              >
            </div>
            <div class="col-body">
              <div>
                <span class="card-label">Structured Format</span>
                <el-switch v-model="htmlSettings.structured"> </el-switch>
              </div>
              <div v-if="htmlSettings.structured">
                <span class="card-label">Number of Tables</span>

                <el-radio v-model="htmlSettings.table" label="single"
                  >Single Table</el-radio
                >
                <el-radio v-model="htmlSettings.table" label="multiple"
                  >Multiple Tables</el-radio
                >
              </div>
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
      csvSettings: {
        file: "single",
        delimiter: ",",
      },
      sqlSettings: {
        table: "single",
      },
      htmlSettings: {
        structured: false,
        table: "single",
      },
      mdSettings: {
        table: "single",
      },
      jsonSettings: {
        structured: false,
        file: "single",
      },
      xmlSettings: {
        structured: false,
        file: "single",
      },
      yamlSettings: {
        structured: false,
        file: "single",
      },
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
          new JsonToCsv(this.show, this.csvSettings);
          break;
        case "json":
          new JsonToJson(this.show, this.jsonSettings);
          break;
        case "html":
          new JsonToHtml(this.show, this.htmlSettings);
          break;
        case "md":
          new JsonToMarkdown(this.show, this.mdSettings);
          break;
        case "sql":
          new JsonToMysql(this.show, this.sqlSettings);
          break;
        case "xml":
          new JsonToXml(this.show, this.xmlSettings);
          break;
        case "yaml":
          new JsonToYaml(this.show, this.yamlSettings);
          break;
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
#app-main {
  .download-area {
    margin: 0px 30px;

    .row-area {
      margin-top: 20px;

      .col-area {
        margin-top: 20px;
        padding: 0 20px;

        .download_btn {
          float: right;
          padding: 3px 0;
          margin-top: -5px;
          width: 80px;
          height: 30px;
        }

        .col-body {
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .card-label {
            width: 120px;
            text-align: left;
            margin-right: 10px;
            display: inline-flex;
          }

          .input-area {
            width: 300px;
          }
        }
      }
    }
  }
}
</style>